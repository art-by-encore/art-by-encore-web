'use client';

import React, { useEffect, useRef } from 'react';

const SmokeyCursor = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const glRef = useRef(null);
  const configRef = useRef(null);
  const pointersRef = useRef([]);

  useEffect(() => {
    // Wait for window to load to ensure proper initialization
    if (typeof window === 'undefined') return;

    const initFluid = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Set initial canvas dimensions
      const resizeCanvas = () => {
        const scaleByPixelRatio = (input) => {
          const pixelRatio = window.devicePixelRatio || 1;
          return Math.floor(input * pixelRatio);
        };
        
        const width = scaleByPixelRatio(canvas.clientWidth);
        const height = scaleByPixelRatio(canvas.clientHeight);
        
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          return true;
        }
        return false;
      };

      resizeCanvas();

      const config = {
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1440,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 3.5,
        VELOCITY_DISSIPATION: 2,
        PRESSURE: 0.1,
        PRESSURE_ITERATIONS: 20,
        CURL: 3,
        SPLAT_RADIUS: 0.5,
        SPLAT_FORCE: 6000,
        SHADING: true,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 0.5, g: 0, b: 0 },
        TRANSPARENT: true,
      };

      configRef.current = config;

      function pointerPrototype() {
        this.id = -1;
        this.texcoordX = 0;
        this.texcoordY = 0;
        this.prevTexcoordX = 0;
        this.prevTexcoordY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.down = false;
        this.moved = false;
        this.color = { r: 0.15, g: 0.15, b: 0.15 };
      }

      const pointers = [new pointerPrototype()];
      pointersRef.current = pointers;

      // Get WebGL context
      const getWebGLContext = (canvas) => {
        const params = { 
          alpha: true, 
          depth: false, 
          stencil: false, 
          antialias: false, 
          preserveDrawingBuffer: false 
        };

        let gl = canvas.getContext('webgl2', params);
        const isWebGL2 = !!gl;
        if (!isWebGL2) {
          gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
        }

        if (!gl) {
          console.error('WebGL not supported');
          return null;
        }

        let halfFloat;
        let supportLinearFiltering;
        if (isWebGL2) {
          gl.getExtension('EXT_color_buffer_float');
          supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
        } else {
          halfFloat = gl.getExtension('OES_texture_half_float');
          supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
        }

        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat ? halfFloat.HALF_FLOAT_OES : gl.FLOAT);
        
        const getSupportedFormat = (gl, internalFormat, format, type) => {
          const supportRenderTextureFormat = (gl, internalFormat, format, type) => {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

            const fbo = gl.createFramebuffer();
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

            const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
            return status === gl.FRAMEBUFFER_COMPLETE;
          };

          if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
            return null;
          }

          return {
            internalFormat,
            format
          };
        };

        let formatRGBA, formatRG, formatR;

        if (isWebGL2) {
          formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
          formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
          formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
        } else {
          formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
          formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
          formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        }

        return {
          gl,
          ext: {
            formatRGBA: formatRGBA || { internalFormat: gl.RGBA, format: gl.RGBA },
            formatRG: formatRG || { internalFormat: gl.RGBA, format: gl.RGBA },
            formatR: formatR || { internalFormat: gl.RGBA, format: gl.RGBA },
            halfFloatTexType,
            supportLinearFiltering: !!supportLinearFiltering
          }
        };
      };

      const webglContext = getWebGLContext(canvas);
      if (!webglContext) return;
      
      const { gl, ext } = webglContext;
      glRef.current = gl;

      if (!ext.supportLinearFiltering) {
        config.DYE_RESOLUTION = 512;
        config.SHADING = false;
      }

      // Compile shader helper
      const compileShader = (type, source, keywords = null) => {
        const addKeywords = (source, keywords) => {
          if (keywords == null) return source;
          let keywordsString = '';
          keywords.forEach(keyword => {
            keywordsString += '#define ' + keyword + '\n';
          });
          return keywordsString + source;
        };

        source = addKeywords(source, keywords);
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error(gl.getShaderInfoLog(shader));
          return null;
        }

        return shader;
      };

      // Create program helper
      const createProgram = (vertexShader, fragmentShader) => {
        if (!vertexShader || !fragmentShader) {
          console.error('Missing shader');
          return null;
        }
        
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
          return null;
        }

        return program;
      };

      // Get uniforms helper
      const getUniforms = (program) => {
        const uniforms = {};
        if (!program) return uniforms;
        
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
          const uniformInfo = gl.getActiveUniform(program, i);
          if (uniformInfo) {
            uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);
          }
        }
        return uniforms;
      };

      class Program {
        constructor(vertexShader, fragmentShader) {
          this.program = createProgram(vertexShader, fragmentShader);
          if (!this.program) {
            console.error('Failed to create program');
          }
          this.uniforms = getUniforms(this.program);
        }

        bind() {
          if (this.program) {
            gl.useProgram(this.program);
          }
        }
      }

      class Material {
        constructor(vertexShader, fragmentShaderSource) {
          this.vertexShader = vertexShader;
          this.fragmentShaderSource = fragmentShaderSource;
          this.programs = {};
          this.activeProgram = null;
          this.uniforms = [];
        }

        setKeywords(keywords) {
          const hashCode = (s) => {
            if (s.length === 0) return 0;
            let hash = 0;
            for (let i = 0; i < s.length; i++) {
              hash = (hash << 5) - hash + s.charCodeAt(i);
              hash |= 0;
            }
            return hash;
          };

          let hash = 0;
          for (let i = 0; i < keywords.length; i++) {
            hash += hashCode(keywords[i]);
          }

          let program = this.programs[hash];
          if (program == null) {
            const fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
            program = createProgram(this.vertexShader, fragmentShader);
            this.programs[hash] = program;
          }

          if (program === this.activeProgram) return;

          this.uniforms = getUniforms(program);
          this.activeProgram = program;
        }

        bind() {
          if (this.activeProgram) {
            gl.useProgram(this.activeProgram);
          }
        }
      }

      // Shaders
      const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `);

      const clearShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;
        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
      `);

      const copyShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `);

      const displayShaderSource = `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uTexture;
        uniform vec2 texelSize;
        void main () {
            vec3 c = texture2D(uTexture, vUv).rgb;
            float a = max(c.r, max(c.g, c.b));
            gl_FragColor = vec4(c, a);
        }
      `;

      const splatShader = compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;
        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `);

      const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform float dt;
        uniform float dissipation;
        void main () {
            vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
            vec4 result = texture2D(uSource, coord);
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `);

      const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;
            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `);

      const curlShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `);

      const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;
        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;
            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `);

      const pressureShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `);

      const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;
        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `);

      // Initialize programs
      const copyProgram = new Program(baseVertexShader, copyShader);
      const clearProgram = new Program(baseVertexShader, clearShader);
      const splatProgram = new Program(baseVertexShader, splatShader);
      const advectionProgram = new Program(baseVertexShader, advectionShader);
      const divergenceProgram = new Program(baseVertexShader, divergenceShader);
      const curlProgram = new Program(baseVertexShader, curlShader);
      const vorticityProgram = new Program(baseVertexShader, vorticityShader);
      const pressureProgram = new Program(baseVertexShader, pressureShader);
      const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);
      const displayMaterial = new Material(baseVertexShader, displayShaderSource);

      // Blit function
      const blit = (() => {
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
        
        const indices = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
        
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);

        return (target, clear = false) => {
          if (target == null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
          } else {
            gl.viewport(0, 0, target.width, target.height);
            gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
          }
          if (clear) {
            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
          }
          gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        };
      })();

      // Helper functions
      const getResolution = (resolution) => {
        const aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
        const min = Math.round(resolution);
        const max = Math.round(resolution * aspectRatio);

        if (gl.drawingBufferWidth > gl.drawingBufferHeight) {
          return { width: max, height: min };
        } else {
          return { width: min, height: max };
        }
      };

      const scaleByPixelRatio = (input) => {
        const pixelRatio = window.devicePixelRatio || 1;
        return Math.floor(input * pixelRatio);
      };

      // FBO creation
      const createFBO = (w, h, internalFormat, format, type, param) => {
        gl.activeTexture(gl.TEXTURE0);
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, w, h);
        gl.clear(gl.COLOR_BUFFER_BIT);

        return {
          texture,
          fbo,
          width: w,
          height: h,
          texelSizeX: 1.0 / w,
          texelSizeY: 1.0 / h,
          attach(id) {
            gl.activeTexture(gl.TEXTURE0 + id);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            return id;
          }
        };
      };

      const createDoubleFBO = (w, h, internalFormat, format, type, param) => {
        let fbo1 = createFBO(w, h, internalFormat, format, type, param);
        let fbo2 = createFBO(w, h, internalFormat, format, type, param);

        return {
          width: w,
          height: h,
          texelSizeX: fbo1.texelSizeX,
          texelSizeY: fbo1.texelSizeY,
          get read() {
            return fbo1;
          },
          get write() {
            return fbo2;
          },
          swap() {
            const temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
          }
        };
      };

      let dye, velocity, divergence, curl, pressure;

      const initFramebuffers = () => {
        const simRes = getResolution(config.SIM_RESOLUTION);
        const dyeRes = getResolution(config.DYE_RESOLUTION);

        const texType = ext.halfFloatTexType;
        const rgba = ext.formatRGBA;
        const rg = ext.formatRG;
        const r = ext.formatR;
        const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

        gl.disable(gl.BLEND);

        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
        divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
        pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      };

      // Color generation
      const generateColor = () => {
        const HSVtoRGB = (h, s, v) => {
          let r, g, b, i, f, p, q, t;
          i = Math.floor(h * 6);
          f = h * 6 - i;
          p = v * (1 - s);
          q = v * (1 - f * s);
          t = v * (1 - (1 - f) * s);

          switch (i % 6) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            case 5: r = v; g = p; b = q; break;
          }

          return { r, g, b };
        };

        const c = HSVtoRGB(Math.random(), 1.0, 1.0);
        c.r *= 0.15;
        c.g *= 0.15;
        c.b *= 0.15;
        return c;
      };

      // Splat function
      const splat = (x, y, dx, dy, color) => {
        const correctRadius = (radius) => {
          const aspectRatio = canvas.width / canvas.height;
          if (aspectRatio > 1) radius *= aspectRatio;
          return radius;
        };

        splatProgram.bind();
        gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
        gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
        gl.uniform2f(splatProgram.uniforms.point, x, y);
        gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
        gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
        blit(velocity.write);
        velocity.swap();

        gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
        gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
        blit(dye.write);
        dye.swap();
      };

      // Update pointers
      const updatePointerMoveData = (pointer, posX, posY, color) => {
        const correctDeltaX = (delta) => {
          const aspectRatio = canvas.width / canvas.height;
          if (aspectRatio < 1) delta *= aspectRatio;
          return delta;
        };

        const correctDeltaY = (delta) => {
          const aspectRatio = canvas.width / canvas.height;
          if (aspectRatio > 1) delta /= aspectRatio;
          return delta;
        };

        pointer.prevTexcoordX = pointer.texcoordX;
        pointer.prevTexcoordY = pointer.texcoordY;
        pointer.texcoordX = posX / canvas.width;
        pointer.texcoordY = 1.0 - posY / canvas.height;
        pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
        pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
        pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
        pointer.color = color;
      };

      const splatPointer = (pointer) => {
        const dx = pointer.deltaX * config.SPLAT_FORCE;
        const dy = pointer.deltaY * config.SPLAT_FORCE;
        splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
      };

      // Main update loop
      let lastUpdateTime = Date.now();
      let colorUpdateTimer = 0.0;

      const update = () => {
        if (!canvas || !gl) return;

        const now = Date.now();
        const dt = Math.min((now - lastUpdateTime) / 1000, 0.016);
        lastUpdateTime = now;

        // Update colors
        colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
        if (colorUpdateTimer >= 1) {
          colorUpdateTimer = 0;
          pointers.forEach(p => {
            p.color = generateColor();
          });
        }

        // Apply inputs
        pointers.forEach(p => {
          if (p.moved) {
            p.moved = false;
            splatPointer(p);
          }
        });

        // Fluid simulation steps
        gl.disable(gl.BLEND);

        // Curl
        curlProgram.bind();
        gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(curl);

        // Vorticity
        vorticityProgram.bind();
        gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
        gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
        gl.uniform1f(vorticityProgram.uniforms.dt, dt);
        blit(velocity.write);
        velocity.swap();

        // Divergence
        divergenceProgram.bind();
        gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
        blit(divergence);

        // Pressure
        clearProgram.bind();
        gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
        gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
        blit(pressure.write);
        pressure.swap();

        pressureProgram.bind();
        gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
        
        for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
          gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
          blit(pressure.write);
          pressure.swap();
        }

        // Gradient subtract
        gradienSubtractProgram.bind();
        gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
        gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
        blit(velocity.write);
        velocity.swap();

        // Advection
        advectionProgram.bind();
        gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
        const velocityId = velocity.read.attach(0);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
        gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
        gl.uniform1f(advectionProgram.uniforms.dt, dt);
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
        blit(velocity.write);
        velocity.swap();

        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
        gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
        blit(dye.write);
        dye.swap();

        // Render
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        
        displayMaterial.setKeywords(config.SHADING ? ["SHADING"] : []);
        displayMaterial.bind();
        if (displayMaterial.uniforms.uTexture !== undefined) {
          gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
        }
        blit(null);

        animationRef.current = requestAnimationFrame(update);
      };

      // Initialize
      initFramebuffers();
      
      // Start with some random splats
      for (let i = 0; i < 5; i++) {
        const color = generateColor();
        const x = Math.random();
        const y = Math.random();
        const dx = (Math.random() - 0.5) * 10;
        const dy = (Math.random() - 0.5) * 10;
        splat(x, y, dx, dy, color);
      }

      // Event handlers
      const handleMouseMove = (e) => {
        const rect = canvas.getBoundingClientRect();
        const pointer = pointers[0];
        const posX = scaleByPixelRatio(e.clientX - rect.left);
        const posY = scaleByPixelRatio(e.clientY - rect.top);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      };

      const handleTouchMove = (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const pointer = pointers[0];
        const touch = e.touches[0];
        const posX = scaleByPixelRatio(touch.clientX - rect.left);
        const posY = scaleByPixelRatio(touch.clientY - rect.top);
        updatePointerMoveData(pointer, posX, posY, pointer.color);
      };

      // Add event listeners
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });

      // Start animation
      update();

      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('touchmove', handleTouchMove);
      };
    };

    // Initialize immediately instead of waiting for load
    initFluid();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fluid"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'auto',
      }}
    />
  );
};

export default SmokeyCursor;
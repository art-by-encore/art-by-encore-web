'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './spotlight-style.css';
import { Container } from '../ui';
import Image from 'next/image';

export default function SpotlightGallery() {
  const sectionRef = useRef(null);
  const coverImgRef = useRef(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations
    initSpotlightAnimations();

    // Resize handler
    window.addEventListener('resize', initSpotlightAnimations);

    return () => {
      window.removeEventListener('resize', initSpotlightAnimations);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  function initSpotlightAnimations() {
    const images = document.querySelectorAll('.spotlight-gallery .img');
    const coverImg = coverImgRef.current;

    // Make sure we have images to animate
    if (images.length === 0) return;

    const scatterDirections = [
      { x: 1.3, y: 0.7 },
      { x: -1.5, y: 1.0 },
      { x: 1.1, y: -1.3 },
      { x: -1.7, y: -0.8 },
      { x: 0.8, y: 1.5 },
      { x: -1.0, y: -1.4 },
      { x: 1.6, y: 0.3 },
      { x: -0.7, y: 1.7 },
      { x: 1.2, y: -1.6 },
      { x: -1.4, y: 0.9 },
      { x: 1.8, y: -0.5 },
      { x: -1.1, y: -1.8 },
      { x: 0.9, y: 1.8 },
      { x: -1.9, y: 0.4 },
      { x: 1.0, y: -1.9 },
      { x: -0.8, y: 1.9 },
      { x: 1.7, y: -1.0 },
      { x: -1.3, y: -1.2 },
      { x: 0.7, y: 2.0 },
      { x: 1.25, y: -0.2 }
    ];

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth < 1000;
    const scatterMultiplier = isMobile ? 2.5 : 0.5;

    // Create start positions for ALL images
    const startPositions = Array.from(images).map(() => ({
      x: 0,
      y: 0,
      z: -1000,
      scale: 0,
    }));

    // Create end positions for ALL images
    const endPositions = Array.from(images).map((_, index) => {
      // Use scatterDirections if available, otherwise create random directions
      const dir = scatterDirections[index % scatterDirections.length] || {
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1
      };

      return {
        x: dir.x * screenWidth * scatterMultiplier,
        y: dir.y * screenHeight * scatterMultiplier,
        z: 2000,
        scale: 1,
      };
    });

    // Set initial positions
    images.forEach((img, index) => {
      gsap.set(img, startPositions[index]);
    });

    if (coverImg) {
      gsap.set(coverImg, { z: -1000, scale: 0, x: 0, y: 0 });
    }

    // Create ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: '.spotlight-gallery',
      start: 'top top',
      end: `+=${window.innerHeight * 15}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      refreshPriority: 5,
      onUpdate: (self) => {
        const progress = self.progress;

        images.forEach((img, index) => {
          const staggerDelay = index * 0.03;
          const scaleMultiplier = isMobile ? 4 : 2;
          let imageProgress = Math.max(0, (progress - staggerDelay) * 4);

          // Clamp progress between 0 and 1
          imageProgress = Math.min(1, imageProgress);

          const start = startPositions[index];
          const end = endPositions[index];

          // Ensure positions exist
          if (start && end) {
            const zValue = gsap.utils.interpolate(start.z, end.z, imageProgress);
            const scaleValue = gsap.utils.interpolate(start.scale, end.scale, imageProgress * scaleMultiplier);
            const xValue = gsap.utils.interpolate(start.x, end.x, imageProgress);
            const yValue = gsap.utils.interpolate(start.y, end.y, imageProgress);

            gsap.set(img, {
              z: zValue,
              scale: scaleValue,
              x: xValue,
              y: yValue,
            });
          }
        });

        if (coverImg) {
          const coverProgress = Math.max(0, (progress - 0.7) * 4);
          const coverZValue = -1000 + 1000 * Math.min(1, coverProgress);
          const coverScaleValue = Math.min(1, coverProgress * 2);

          gsap.set(coverImg, {
            z: coverZValue,
            scale: coverScaleValue,
            x: 0,
            y: 0,
          });
        }
      },
    });

    return trigger;
  }

  // Image data
  const images = [
    'img-1.png', 'img-2.png', 'img-3.png', 'img-4.png', 'img-5.png', 'img-6.png',
    'img-7.png', 'img-8.png', 'img-9.png', 'img-10.png', 'img-11.png', 'img-1.png',
    'img-2.png', 'img-3.png', 'img-4.png', 'img-5.png', 'img-6.png', 'img-7.png',
    'img-8.png', 'img-9.png',
  ];

  return (
    <section className="spotlight-gallery" ref={sectionRef}>
      <div className="spotlight-images">
        {images.map((img, index) => (
          <div className="img" key={index}>
            <img
              src={`/assets/images/gallery/${img}`}
              alt={`Gallery Image ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {/* Uncomment if you want the cover image */}
      <div className="spotlight-cover-img" ref={coverImgRef}>
        <Container className='absolute inset-0 top-[10%]'>
          <div className='h-[550px] w-full morph-bg-30-border rounded-[20px] flex flex-col justify-center items-center'>
            <div className='max-w-[440px] w-full h-[247px] relative overflow-hidden'>
              <Image src="/assets/images/welcome-encore-art-text.svg" fill className='object-fill' />
            </div>
          </div>
        </Container>
        <img src="/assets/images/animation.svg" alt="Spotlight Cover" />
      </div>
    </section>
  );
}
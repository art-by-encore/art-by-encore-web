'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './diagonal-style.css';
export default function DiagonalImageGallery(props) {
  const { className = '' } = props;
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const particleContainerRef = useRef(null);

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    const images = gsap.utils.toArray(".section-image-gallery img");
    const text = textRef.current;

    if (!text || images.length === 0) return;

    const getResponsiveValues = () => {
      if (typeof window === 'undefined') return { dx: "140vw", dy: "120vh" };

      return window.innerWidth < 501
        ? { dx: "200vw", dy: "220vh" }
        : window.innerWidth < 901
          ? { dx: "170vw", dy: "150vh" }
          : { dx: "140vw", dy: "120vh" };
    };

    const { dx, dy } = getResponsiveValues();

    // First animation timeline for images
    const imageTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-image-gallery",
        start: "top top",
        pin: true,
        scrub: 3,
        end: `+=${images.length * 80}%`,
        invalidateOnRefresh: true,
        refreshPriority: 5 // ✅ ADDED (nothing else changed)
      }
    }).to(".section-image-gallery img", {
      x: dx,
      y: dy,
      rotate: -30,
      stagger: 0.07,
      ease: "power2.inOut"
    });

    // Text animation timeline
    const textScroll = () => {
      if (typeof window === 'undefined') return -1000;
      return -window.innerWidth - text.offsetWidth;
    };

    const textTimeline = gsap.timeline({
      repeat: -1,
      defaults: { ease: "linear" }
    }).to(text, {
      x: textScroll(),
      duration: 20
    }).set(text, {
      x: typeof window !== 'undefined' ? window.innerWidth / 10 : 100
    }).to(text, {
      x: textScroll(),
      duration: 20
    });

    // Handle responsive updates
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      imageTimeline.kill();
      textTimeline.kill();
    };
  }, []);

  // Image data - you can also move this to a separate data file
  const images = [
    '2d-1.png', '2d-2.png', '2d-3.png', '2d-4.png', '2d-5.png', '2d-6.png',
    '2d-7.png', '2d-8.png', '2d-9.png', '2d-10.png', '2d-11.png', '2d-12.png',
    '2d-13.png', '2d-14.png', '2d-15.png', '2d-16.png', '2d-17.png', '2d-18.png',
    '2d-19.png', '2d-20.png',
  ];

  return (
    <>
      <section ref={sectionRef} className={`section-image-gallery ${className}`}>
        <h1 ref={textRef} className="text">
          Welcome TO ENCORE ART.
        </h1>

        {images.map((src, index) => (
          <img
            key={index}
            src={`/assets/images/2d-art-work/${src}`}
            alt={`Image ${index + 1}`}
          />
        ))}

        <div ref={particleContainerRef} className="particle-container"></div>
      </section>

    </>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './spotlight-style-new.css';
import { Container } from '../ui';
import Image from 'next/image';

export default function SpotlightGallery(props) {
  const { className = '' } = props;
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
      { x: -0.7, y: 1.7 }
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

    // Calculate optimal scroll distance based on number of images
    const imageCount = images.length;
    const baseMultiplier = isMobile ? 8 : 6; // Reduced from 15
    const scrollMultiplier = Math.min(baseMultiplier, 3 + (imageCount * 0.1));
    const scrollDistance = window.innerHeight * scrollMultiplier;

    // Create ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: '.spotlight-gallery',
      start: 'top top',
      end: `+=${scrollDistance}px`, // Reduced scroll distance
      pin: true,
      pinSpacing: true,
      scrub: 1,
      refreshPriority: 5,
      onUpdate: (self) => {
        const progress = self.progress;

        images.forEach((img, index) => {
          const staggerDelay = index * 0.03;
          const scaleMultiplier = isMobile ? 3 : 1.5; // Reduced from 4 and 2
          let imageProgress = Math.max(0, (progress - staggerDelay) * 3); // Reduced from 4

          // Clamp progress between 0 and 1 with easing
          imageProgress = Math.min(1, imageProgress);
          // Ease-out function for smoother end
          const easedProgress = imageProgress < 0.5
            ? 2 * imageProgress * imageProgress
            : 1 - Math.pow(-2 * imageProgress + 2, 2) / 2;

          const start = startPositions[index];
          const end = endPositions[index];

          // Ensure positions exist
          if (start && end) {
            const zValue = gsap.utils.interpolate(start.z, end.z, easedProgress);
            const scaleValue = gsap.utils.interpolate(start.scale, end.scale, easedProgress * scaleMultiplier);
            const xValue = gsap.utils.interpolate(start.x, end.x, easedProgress);
            const yValue = gsap.utils.interpolate(start.y, end.y, easedProgress);

            gsap.set(img, {
              z: zValue,
              scale: scaleValue,
              x: xValue,
              y: yValue,
            });
          }
        });

        if (coverImg) {
          const coverProgress = Math.max(0, (progress - 0.7) * 3); // Reduced from 4
          const coverZValue = -1000 + 1000 * Math.min(1, coverProgress);
          const coverScaleValue = Math.min(1, coverProgress * 1.5); // Reduced from 2

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
    '2d-1.png', '2d-2.png', '2d-3.png', '2d-4.png', '2d-5.png', '2d-6.png',
    '2d-7.png', '2d-8.png', '2d-9.png', '2d-10.png', '2d-11.png', '2d-12.png',
    '2d-13.png', '2d-14.png', '2d-15.png', '2d-16.png', '2d-17.png', '2d-18.png',
    '2d-19.png', '2d-20.png',
  ];

  return (
    <section className={`${className} spotlight-gallery mb-[80px]`} ref={sectionRef}>
      <div className="spotlight-images">
        {images.map((img, index) => (
          <div className="img" key={index}>
            <img
              src={`/assets/images/2d-art-work/${img}`}
              alt={`Gallery Image ${index + 1}`}
              loading="lazy"
              className='rounded-[12px]'
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
        <img src="https://res.cloudinary.com/ds7thn4jv/image/upload/v1770271467/compressed_6_p9xkna.png" alt="Spotlight Cover" />
      </div>
    </section>
  );
}
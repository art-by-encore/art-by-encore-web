"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContentReveal({ 
  children, 
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  yOffset = 30,
  ease = "power4.out",
  className = "",
  // Optional: if you want to animate specific elements inside
  selector = "> *" // Animates direct children by default
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Get elements to animate based on selector
    const elements = containerRef.current.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    // Set initial state
    gsap.set(elements, {
      y: yOffset,
      opacity: 0
    });

    // Animate into view
    const animation = gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: duration,
      stagger: stagger,
      ease: ease,
      delay: delay,
      overwrite: "auto"
    });

    return () => {
      animation.kill();
    };

  }, [children, delay, duration, stagger, yOffset, ease, selector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function TextAppear({ children, delay = 0 }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "lines",
      mask: "lines",
    });

    gsap.set(split.lines, {
      yPercent: 110,
    });

    gsap.to(split.lines, {
      yPercent: 5,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out",
      delay: delay,
    });

    return () => {
      split.revert();
    };
  }, [children, delay]);

  return <div ref={textRef}>{children}</div>;
}
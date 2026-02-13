"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import "./cursor.css";

const images = [
    "/assets/images/cursor/art-1.png",
    "/assets/images/cursor/art-2.png",
    "/assets/images/cursor/art-3.png",
    "/assets/images/cursor/art-4.png",
    "/assets/images/cursor/art-5.png",
    "/assets/images/cursor/art-6.png",
    "/assets/images/cursor/art-7.png",
];

const CursorTrailAnimation = ({ children }) => {
    const containerRef = useRef(null);
    const indexRef = useRef(0);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const [distanceThreshold, setDistanceThreshold] = useState(150); // Default to 150

    useEffect(() => {
        // Check if window is defined (client-side only)
        if (typeof window !== 'undefined') {
            setDistanceThreshold(window.innerWidth < 900 ? 90 : 150);
        }
    }, []); // Run only once on mount

    const createTrail = (x, y) => {
        const img = document.createElement("img");
        img.className = "cursor-images";
        img.src = images[indexRef.current] || "/assets/images/cursor/default.png";  // Fallback image if the path is missing
        indexRef.current = (indexRef.current + 1) % images.length;

        // Ensure containerRef exists before appending
        if (containerRef.current) {
            containerRef.current.appendChild(img);
        }

        gsap.set(img, {
            x,
            y,
            scale: 0,
            opacity: 0,
            rotation: gsap.utils.random(-20, 20),
        });

        gsap.to(img, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
        });

        gsap.to(img, {
            scale: 0.2,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: "power2.in",
            onComplete: () => {
                img.remove();
            }
        });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            const dx = e.clientX - lastX.current;
            const dy = e.clientY - lastY.current;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > distanceThreshold) {
                createTrail(e.clientX, e.clientY);
                lastX.current = e.clientX;
                lastY.current = e.clientY;
            }
        };

        // Adding event listeners
        window.addEventListener("mousemove", handleMouseMove);

        // Cleanup event listener on unmount
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [distanceThreshold]); // Add distanceThreshold to dependencies

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setDistanceThreshold(window.innerWidth < 900 ? 90 : 150);
            }
        };

        // Adding resize event listener
        window.addEventListener("resize", handleResize);

        // Cleanup event listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className='container-cursor relative w-full h-full overflow-hidden' ref={containerRef}>
            {/* Children prop added to allow dynamic content */}
            {children}
        </section>
    );
};

export default CursorTrailAnimation;

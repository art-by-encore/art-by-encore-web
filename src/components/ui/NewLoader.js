"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import "./new-loader.css";
import { useLoaderContext } from "@/app/hooks/LoaderContext";
export default function NewLoader() {
    const wrapRef = useRef(null);
    const imageRef = useRef(null);
    const gradientRef = useRef(null); // Gradient container ref
    const {setIsLoader} = useLoaderContext()
    useEffect(() => {
        const wrap = wrapRef.current;
        const image = imageRef.current;
        const gradient = gradientRef.current;
        if (!wrap || !image || !gradient) return;

        const H = window.innerHeight;

        const tl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = "visible";
                setIsLoader(false);
            },
        });

        // 1) Logo in
        tl.fromTo(
            image,
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power2.out" }
        );

        // 2) Brief hold
        tl.to({}, { duration: 0.4 });

        // 3) Curtain up to 50% (logo still visible)
        // Animate ONLY the gradient as the curtain
        tl.to(
            gradient,
            {
                y: -H * 0.5,
                duration: 0.8,
                ease: "power2.inOut",
            },
            "-=0.2"
        );

        // 4) Exactly at halfway: hide the logo
        tl.to(
            image,
            {
                y: -30,
                opacity: 0,
                scale: 0.95,
                duration: 0.5,
                ease: "power2.in",
            },
            ">+0.01"
        );

        // 5) Continue curtain from 50% to 100%
        tl.to(
            gradient,
            {
                y: -H,
                duration: 0.8,
                ease: "power2.inOut",
            },
            "<"
        );

        // 6) Slide the loader wrapper offscreen
        tl.to(wrap, {
            y: -H * 1.2,
            duration: 1.0,
            ease: "power2.inOut",
        });

        // 7) Remove it
        tl.set(wrap, { zIndex: -1, display: "none" });
    }, []);

    return (
        <div ref={wrapRef} className="loader-wrap">
            {/* Removed SVG rectangle entirely */}
            <div ref={gradientRef} className='absolute w-full h-full inset-0 bg-black curtain'>
                <div className='relative w-full h-full'>
                    <Image fill alt="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
            
            <div className="loader-wrap-heading">
                <span ref={imageRef} className="loader-image-container">
                    <Image
                        src="/assets/icons/logo.svg"
                        alt="one tech"
                        width={127}
                        height={36}
                        className="loader-image"
                        priority
                    />
                </span>
            </div>
        </div>
    );
}
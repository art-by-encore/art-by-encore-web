"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SmoothLayout({ children }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.6,
            lerp: 0.045,
            wheelMultiplier: 0.95,
            smoothWheel: true,
            // wheelMultiplier: 1.1,
            touchMultiplier: 1,
        });

        function update(time) {
            lenis.raf(time * 1000);
        }

        gsap.ticker.add(update);
        lenis.on("scroll", ScrollTrigger.update);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}

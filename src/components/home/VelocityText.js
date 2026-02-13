"use client"
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

const VelocityText = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["45deg", "-45deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const xRaw = useTransform(scrollYProgress, [0, 1], [0, -2000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  return (
    <section
      ref={targetRef}
      className="h-[1000vh] text-orange  text-center "
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left whitespace-nowrap font-title-211"
        >
          WHO WE ARE
        </motion.p>
      </div>
    </section>
  );
};
export default VelocityText;
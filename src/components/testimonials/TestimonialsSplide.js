"use client";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import Image from "next/image";
import "@splidejs/react-splide/css";
import "./slider.css";

const TestimonialsSplide = ({ data, direction = "right", delay = 0 }) => {
    const isLeft = direction === "left";

    return (
        <div className="max-w-[1700px] w-full relative mx-auto overflow-x-hidden">
            <Splide
                extensions={{ AutoScroll }}
                options={{
                    type: "loop",
                    drag: false,
                    arrows: false,
                    pagination: false,
                    autoWidth: true,
                    gap: "24px",

                    autoScroll: {
                        speed: isLeft ? -1.3 : 1.3,
                        pauseOnHover: false,
                        pauseOnFocus: false,
                    },

                    easing: "linear",
                }}
                className="marquee-swiper"
            >
                {data?.map((item, index) => (
                    <SplideSlide key={index} className="!w-auto !h-auto">
                        <div
                            className="
                
                w-[335px] h-[203px]
                md:w-[640px] md:h-[387px]
                sm:w-[335px] sm:h-[203px]
                border border-solid morph-bg-border
                relative overflow-hidden bg-white
                md:rounded-[16px] rounded-[10px]
                flex-shrink-0
              "
                        >
                            <Image
                                src={item.url}
                                alt={item.alt}
                                className="w-full h-full object-contain"
                                fill
                                priority
                            />

                            <div className="animate-border pointer-events-none">
                                <span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </SplideSlide>
                ))}
            </Splide>

            {/* Styles untouched */}
            <style jsx global>{`
        .marquee-swiper .splide__track {
          overflow: visible;
        }

        .marquee-swiper .splide__list {
          transition-timing-function: linear !important;
        }

        :root { --color-orange: #E14807; }

        .animate-border span:nth-child(1) {
          position: absolute; top: 0; left: 0; height: 3px; width: 100%;
          background: linear-gradient(to right, transparent, var(--color-orange));
          animation: borderTopAnim 2s linear infinite;
        }
        @keyframes borderTopAnim {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .animate-border span:nth-child(2) {
          position: absolute; top: 0; right: 0; width: 3px; height: 100%;
          background: linear-gradient(to bottom, transparent, var(--color-orange));
          animation: borderRightAnim 2s linear infinite;
          animation-delay: .5s;
        }
        @keyframes borderRightAnim {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .animate-border span:nth-child(3) {
          position: absolute; bottom: 0; right: 0; width: 100%; height: 3px;
          background: linear-gradient(to left, transparent, var(--color-orange));
          animation: borderBottomAnim 2s linear infinite;
        }
        @keyframes borderBottomAnim {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }

        .animate-border span:nth-child(4) {
          position: absolute; top: 0; left: 0; width: 3px; height: 100%;
          background: linear-gradient(to top, transparent, var(--color-orange));
          animation: borderLeftAnim 2s linear infinite;
          animation-delay: .5s;
        }
        @keyframes borderLeftAnim {
          0% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
        </div>
    );
};

export default TestimonialsSplide;

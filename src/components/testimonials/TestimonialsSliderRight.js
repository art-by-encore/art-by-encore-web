"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "./slider.css"

const TestimonialsSliderRight = (props) => {
    const { data, direction = "right", delay = 0 } = props;
    
    // Add CSS class based on direction
    const swiperClass = direction === "left" 
        ? "marquee-swiper marquee-reverse" 
        : "marquee-swiper";

    return (
        <div className="max-w-[1600px] w-full relative mx-auto">
            <Swiper
                a11y={false}
                slidesPerView={'auto'}
                spaceBetween={24}
                centeredSlides={false}
                speed={direction === "left" ? 10000 : 8000} // Adjust speed if needed
                autoplay={{
                    delay: delay,
                    disableOnInteraction: false,
                    reverseDirection: direction === "left", // Reverse for left direction
                }}
                loop={true}
                modules={[Autoplay]}
                allowTouchMove={false}
                className={swiperClass}
            >
                {data?.map((item, index) => (
                    <SwiperSlide key={index} className="!w-auto !h-auto">
                        <div
                            className="
                w-full 
                max-w-[335px] h-[203px]
                md:max-w-[640px] md:h-[387px]
                sm:max-w-[335px] sm:h-[203px]
                border border-solid morph-bg-border
                relative overflow-hidden bg-white
                md:rounded-[16px] rounded-[10px]
                flex-shrink-0
              "
                        >
                            <img
                                src={item.url}
                                alt={item.alt}
                                className="w-full h-full object-contain"
                            />

                            <div className="animate-border pointer-events-none">
                                <span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Add CSS for reverse animation if needed */}
            <style jsx global>{`
                .marquee-reverse .swiper-wrapper {
                    transition-timing-function: linear !important;
                }
                
                :root { --color-orange: #E14807; }

                .animate-border span:nth-child(1) {
                    position: absolute; top: 0; left: 0; height: 3px; width: 100%;
                    background: linear-gradient(to right, transparent, var(--color-orange));
                    animation: borderTopAnim 2s linear infinite;
                }
                @keyframes borderTopAnim { 0%{transform:translateX(-100%);}100%{transform:translateX(100%);} }

                .animate-border span:nth-child(2) {
                    position: absolute; top: 0; right: 0; width: 3px; height: 100%;
                    background: linear-gradient(to bottom, transparent, var(--color-orange));
                    animation: borderRightAnim 2s linear infinite; animation-delay: .5s;
                }
                @keyframes borderRightAnim { 0%{transform:translateY(-100%);}100%{transform:translateY(100%);} }

                .animate-border span:nth-child(3) {
                    position: absolute; bottom: 0; right: 0; width: 100%; height: 3px;
                    background: linear-gradient(to left, transparent, var(--color-orange));
                    animation: borderBottomAnim 2s linear infinite;
                }
                @keyframes borderBottomAnim { 0%{transform:translateX(100%);}100%{transform:translateX(-100%);} }

                .animate-border span:nth-child(4) {
                    position: absolute; top: 0; left: 0; width: 3px; height: 100%;
                    background: linear-gradient(to top, transparent, var(--color-orange));
                    animation: borderLeftAnim 2s linear infinite; animation-delay: .5s;
                }
                @keyframes borderLeftAnim { 0%{transform:translateY(100%);}100%{transform:translateY(-100%);} }
            `}</style>
        </div>
    );
};

export default TestimonialsSliderRight;
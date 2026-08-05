"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LightGallery from "lightgallery/react";
import { testimonialVideos } from "@/utils/testimonialVideos";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-video.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgRotate from "lightgallery/plugins/rotate";
import lgVideo from "lightgallery/plugins/video";

const testimonials = testimonialVideos;

const ClientVideoCard = ({ className = "" }) => {
    const lightGalleryRef = useRef(null);
    const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        setActiveTestimonial(testimonials[randomIndex]);
    }, []);

    const { videoSrc, posterSrc, clientName } = activeTestimonial;

    const onInit = (detail) => {
        if (detail) {
            lightGalleryRef.current = detail.instance;
        }
    };

    return (
        <div
            className={`relative overflow-hidden flex flex-col p-[20px] sm:p-[24px] md:p-[30px] lg:p-[40px] rounded-[16px] sm:rounded-[20px] lg:rounded-[30px] h-fit border-white border-[1px] morph-bg-border w-full ${className}`}
        >
            <div className="animate-border pointer-events-none">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className="relative z-10 flex flex-col gap-[16px] md:gap-[20px]">
                <div className="flex items-center justify-between gap-[12px] md:gap-[16px]">
                    <h3 className="font-card-title text-white text-[20px] md:text-[24px] lg:text-[30px] leading-tight">Client love</h3>
                    <Link
                        href="/testimonials"
                        className="flex items-center gap-[10px] text-white shrink-0"
                    >
                        <svg
                            className="w-[16px] h-[16px]"
                            viewBox="0 0 12 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 1.5L10.5 7L1 12.5V1.5Z"
                                fill="white"
                                stroke="white"
                                strokeWidth="1"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="font-btn-text">Play all</span>
                    </Link>
                </div>

                <LightGallery
                    key={videoSrc}
                    onInit={onInit}
                    speed={500}
                    selector=".banner-testimonial-video-item"
                    mode="lg-fade"
                    download={false}
                    autoplayFirstVideo={false}
                    thumbnail={false}
                    plugins={[
                        lgThumbnail,
                        lgZoom,
                        lgAutoplay,
                        lgFullscreen,
                        lgRotate,
                        lgVideo,
                    ]}
                >
                    <a
                        className="banner-testimonial-video-item relative block cursor-pointer group w-full h-[180px] sm:h-[200px] md:h-[230px] lg:h-[260px] rounded-[10px] sm:rounded-[12px] overflow-hidden"
                        data-lg-size="1280-720"
                        data-thumb={posterSrc}
                        data-video={`{
    "source": [
      {
        "src": "${videoSrc}",
        "type": "video/mp4"
      }
    ],
    "attributes": {
      "controls": true,
      "preload": "metadata",
      "controlsList": "nodownload noplaybackrate",
      "playsinline": true,
      "poster": "${posterSrc}"
    }
  }`}
                    >
                        <img
                            src={posterSrc}
                            alt={`${clientName} testimonial`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                            <div className="w-[52px] h-[52px] sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                <svg
                                    className="w-[18px] h-[18px] sm:w-8 sm:h-8 text-black ml-1"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </LightGallery>

                <h4 className="font-card-title text-white text-[18px] md:text-[22px] lg:text-[26px] leading-tight">{clientName}</h4>
            </div>

            <style jsx global>{`
                :root {
                    --color-orange: #e14807;
                }

                .animate-border span:nth-child(1) {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 3px;
                    width: 100%;
                    background: linear-gradient(to right, transparent, var(--color-orange));
                    animation: borderTopAnim 2s linear infinite;
                }
                @keyframes borderTopAnim {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-border span:nth-child(2) {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 3px;
                    height: 100%;
                    background: linear-gradient(to bottom, transparent, var(--color-orange));
                    animation: borderRightAnim 2s linear infinite;
                    animation-delay: 0.5s;
                }
                @keyframes borderRightAnim {
                    0% {
                        transform: translateY(-100%);
                    }
                    100% {
                        transform: translateY(100%);
                    }
                }

                .animate-border span:nth-child(3) {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 100%;
                    height: 3px;
                    background: linear-gradient(to left, transparent, var(--color-orange));
                    animation: borderBottomAnim 2s linear infinite;
                }
                @keyframes borderBottomAnim {
                    0% {
                        transform: translateX(100%);
                    }
                    100% {
                        transform: translateX(-100%);
                    }
                }

                .animate-border span:nth-child(4) {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 3px;
                    height: 100%;
                    background: linear-gradient(to top, transparent, var(--color-orange));
                    animation: borderLeftAnim 2s linear infinite;
                    animation-delay: 0.5s;
                }
                @keyframes borderLeftAnim {
                    0% {
                        transform: translateY(100%);
                    }
                    100% {
                        transform: translateY(-100%);
                    }
                }
            `}</style>
        </div>
    );
};

export default ClientVideoCard;

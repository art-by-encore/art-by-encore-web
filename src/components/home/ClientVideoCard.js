"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { testimonialVideos } from "@/utils/testimonialVideos";
import { playVideoWithSound, warmVideo } from "@/utils/videoPlayback";

const testimonials = testimonialVideos;

const ClientVideoCard = ({ className = "" }) => {
    const videoRef = useRef(null);
    const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * testimonials.length);
        setActiveTestimonial(testimonials[randomIndex]);
    }, []);

    const { videoSrc, posterSrc, clientName, position, description } = activeTestimonial;

    useEffect(() => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            warmVideo(videoRef.current);
        }
    }, [videoSrc]);

    const handlePlayVideo = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            await playVideoWithSound(video);
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    };

    const handlePauseVideo = () => {
        const video = videoRef.current;
        if (!video) return;

        video.pause();
        setIsPlaying(false);
    };

    const handleVideoPause = () => setIsPlaying(false);
    const handleVideoEnded = () => setIsPlaying(false);

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

                <div
                    className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-[10px] sm:rounded-[12px] overflow-hidden group"
                    onMouseEnter={() => warmVideo(videoRef.current)}
                    onTouchStart={() => warmVideo(videoRef.current)}
                >
                    <video
                        ref={videoRef}
                        key={videoSrc}
                        src={videoSrc}
                        poster={posterSrc}
                        className="w-full h-full object-cover"
                        playsInline
                        preload="metadata"
                        controls={false}
                        controlsList="nodownload nofullscreen noremoteplayback"
                        disablePictureInPicture
                        disableRemotePlayback
                        onPause={handleVideoPause}
                        onEnded={handleVideoEnded}
                        onPlay={() => setIsPlaying(true)}
                    />

                    {!isPlaying && (
                        <button
                            type="button"
                            onClick={handlePlayVideo}
                            className="absolute inset-0 z-10 flex items-center justify-center"
                            aria-label="Play video"
                        >
                            <span className="w-[52px] h-[52px] rounded-full bg-black/55 backdrop-blur-[2px] flex items-center justify-center">
                                <svg
                                    className="w-[18px] h-[18px] ml-[3px]"
                                    viewBox="0 0 18 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 2.5L15.5 10L3 17.5V2.5Z"
                                        fill="white"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </button>
                    )}

                    {isPlaying && (
                        <button
                            type="button"
                            onClick={handlePauseVideo}
                            className="absolute inset-0 z-10 flex items-center justify-center"
                            aria-label="Pause video"
                        >
                            <span className="w-[52px] h-[52px] rounded-full bg-black/55 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <svg
                                    className="w-[16px] h-[16px]"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <rect x="2" y="1" width="4" height="14" rx="1" fill="white" />
                                    <rect x="10" y="1" width="4" height="14" rx="1" fill="white" />
                                </svg>
                            </span>
                        </button>
                    )}
                </div>

                <div className="flex flex-col gap-[8px] md:gap-[12px]">
                    <h4 className="font-card-title text-white text-[20px] md:text-[24px] lg:text-[30px] leading-tight">{clientName}</h4>
                    <p className="font-card-text text-white text-[16px] md:text-[18px]">{position}</p>
                    <p className="font-card-text text-white text-[16px] md:text-[18px] line-clamp-2">{description}</p>
                </div>
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

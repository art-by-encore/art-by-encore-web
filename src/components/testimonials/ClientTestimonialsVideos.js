"use client";

import React, { useEffect, useRef, useState } from "react";
import { Container } from "../ui";
import { testimonialVideos } from "@/utils/testimonialVideos";
import { playVideoWithSound, warmVideo } from "@/utils/videoPlayback";

const TestimonialVideoItem = ({
    item,
    isPlaying,
    onPlay,
    onPause,
    onEnded,
}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (!isPlaying && videoRef.current) {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) warmVideo(video);
            },
            { rootMargin: "200px" }
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [item.videoSrc]);

    useEffect(() => {
        if (!isPlaying || !videoRef.current) return;

        playVideoWithSound(videoRef.current).catch(() => onPause());
    }, [isPlaying]);

    const handlePlay = () => onPlay(item.id);

    const handlePause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        onPause();
    };

    return (
        <div className="flex flex-col gap-[16px]">
            <div
                className="relative w-full h-[240px] md:h-[260px] lg:h-[300px] rounded-[12px] overflow-hidden group"
                onMouseEnter={() => warmVideo(videoRef.current)}
                onTouchStart={() => warmVideo(videoRef.current)}
            >
                <video
                    ref={videoRef}
                    src={item.videoSrc}
                    poster={item.posterSrc}
                    className="w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    controls={false}
                    onEnded={() => onEnded(item.id)}
                    onPause={() => {
                        if (isPlaying) onPause();
                    }}
                />

                {!isPlaying && (
                    <button
                        type="button"
                        onClick={handlePlay}
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        aria-label={`Play ${item.clientName} testimonial`}
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
                        onClick={handlePause}
                        className="absolute inset-0 z-10 flex items-center justify-center"
                        aria-label={`Pause ${item.clientName} testimonial`}
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

            <h4 className="font-card-title text-white">{item.clientName}</h4>
        </div>
    );
};

const ClientTestimonialsVideos = () => {
    const [playingId, setPlayingId] = useState(null);

    const handlePlay = (id) => setPlayingId(id);
    const handlePause = () => setPlayingId(null);
    const handleEnded = () => setPlayingId(null);

    return (
        <section className="lg:py-[80px] md:py-[60px] py-[40px]">
            <Container className="!lg:px-0 !px-0">
                <div className="flex flex-col gap-[30px]">
                    <h2 className="font-title-60 text-white">What our clients say</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
                        {testimonialVideos.map((item) => (
                            <TestimonialVideoItem
                                key={item.id}
                                item={item}
                                isPlaying={playingId === item.id}
                                onPlay={handlePlay}
                                onPause={handlePause}
                                onEnded={handleEnded}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ClientTestimonialsVideos;

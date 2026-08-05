"use client";

import React, { useRef } from "react";
import LightGallery from "lightgallery/react";
import { Container } from "../ui";
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

const ClientTestimonialsVideos = () => {
    const lightGalleryRef = useRef(null);

    const onInit = (detail) => {
        if (detail) {
            lightGalleryRef.current = detail.instance;
        }
    };

    return (
        <section className="lg:py-[80px] md:py-[60px] py-[40px]">
            <Container className="!lg:px-0 !px-0">
                <div className="flex flex-col gap-[30px]">
                    <h2 className="font-title-60 text-white">What our clients say</h2>

                    <LightGallery
                        onInit={onInit}
                        speed={500}
                        selector=".testimonial-video-item"
                        mode="lg-fade"
                        download={false}
                        autoplayFirstVideo={false}
                        thumbnail={true}
                        plugins={[
                            lgThumbnail,
                            lgZoom,
                            lgAutoplay,
                            lgFullscreen,
                            lgRotate,
                            lgVideo,
                        ]}
                    >
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-x-[20px] gap-y-[30px] w-full">
                            {testimonialVideos.map((item) => (
                                <div key={item.id} className="flex flex-col gap-[16px]">
                                    <a
                                        className="testimonial-video-item relative block cursor-pointer group"
                                        data-lg-size="1280-720"
                                        data-thumb={item.posterSrc}
                                        data-video={`{
    "source": [
      {
        "src": "${item.videoSrc}",
        "type": "video/mp4"
      }
    ],
    "attributes": {
      "controls": true,
      "preload": "metadata",
      "controlsList": "nodownload noplaybackrate",
      "playsinline": true,
      "poster": "${item.posterSrc}"
    }
  }`}
                                    >
                                        <div
                                            className="relative w-full overflow-hidden rounded-lg"
                                            style={{ aspectRatio: "3/4" }}
                                        >
                                            <img
                                                src={item.posterSrc}
                                                alt={`${item.clientName} testimonial`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition">
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                                    <svg
                                                        className="w-8 h-8 text-black ml-1"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                    <h4 className="font-card-title text-white">{item.clientName}</h4>
                                </div>
                            ))}
                        </div>
                    </LightGallery>
                </div>
            </Container>
        </section>
    );
};

export default ClientTestimonialsVideos;

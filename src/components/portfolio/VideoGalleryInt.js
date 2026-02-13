"use client";

import React, { useRef, useState, useEffect } from "react";
import LightGallery from "lightgallery/react";
import { Container } from "../ui";
import Image from "next/image";
import { Link } from "next-view-transitions";
import BreadCrumbs from "./BreadCrumbs";
/* LightGallery styles */
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-video.css";

/* Plugins */
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgShare from "lightgallery/plugins/share";
import lgRotate from "lightgallery/plugins/rotate";
import lgVideo from "lightgallery/plugins/video";

const VideoGalleryInt = (props) => {
    const { data, className = '', } = props;
    const lightGalleryRef = useRef(null);
    const [posters, setPosters] = useState({});
    const mainList = data || [];


    const onInit = (detail) => {
        if (detail) {
            lightGalleryRef.current = detail.instance;
            console.log("LightGallery initialized");
        }
    };


    return (
        <div className={`${className} lg:py-[100px] md:py-[60px] py-[40px] relative`}>
            <Container className="relative z-10">
                <BreadCrumbs />
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    selector=".video-gallery-item"
                    mode="lg-fade"
                    download={false}
                    autoplayFirstVideo={false}
                    thumbnail={true} // Enable thumbnails
                    plugins={[
                        lgThumbnail,
                        lgZoom,
                        lgAutoplay,
                        lgFullscreen,

                        lgRotate,
                        lgVideo,
                    ]}
                >
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-[20px] gap-y-[30px]">
                        {mainList.map((item, index) => {
                            let videoSrc = item.video || "";
                            if (
                                videoSrc &&
                                !videoSrc.startsWith("http") &&
                                !videoSrc.startsWith("/")
                            ) {
                                videoSrc = `/${videoSrc}`;
                            }

                            return (
                                <a
                                    key={item.id || index}
                                    className="video-gallery-item relative block cursor-pointer group"
                                    data-lg-size="1280-720"
                                    data-thumb={item?.poster}
                                    data-video={`{
    "source": [
      {
        "src": "${videoSrc}",
        "type": "video/mp4"
      }
    ],
    "attributes": {
      "controls": true,
       "controlsList": "nodownload noplaybackrate",
      "preload": "metadata",
      "playsinline": true,
      "muted": false,
      "poster": "${item?.poster}"
    }
  }`}
                                >
                                    <div
                                        className="relative w-full overflow-hidden rounded-lg"
                                        style={{ aspectRatio: "16/9" }}
                                    >
                                        {/* Preview image for thumbnail */}
                                        <img
                                            src={item?.poster}
                                            alt="art by encore"
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
                            );
                        })}
                    </div>
                </LightGallery>
            </Container>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
        </div>
    );
};

export default VideoGalleryInt;
"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Container } from "../ui";
import LightGallery from "lightgallery/react";
import ImageSkeleton from "./ImageSkeleton";
// styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-fullscreen.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

// plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgShare from "lightgallery/plugins/share";
import lgRotate from "lightgallery/plugins/rotate";

const ImageGalleryTabInt = (props) => {
    const { data, className = '', mainList } = props;
    const lightGalleryRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const galleryItems = mainList || [];

    const onInit = (detail) => {
        if (detail) {
            lightGalleryRef.current = detail.instance;
        }
    };

    const openGallery = (index) => {
        if (lightGalleryRef.current) {
            lightGalleryRef.current.openGallery(index);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${className} lg:pb-[100px] md:pb-[80px] pb-[40px] relative`}>
            <Container className="relative z-10">
                {/* LightGallery with dynamic elements */}
                <LightGallery
                    ref={lightGalleryRef}
                    onInit={onInit}
                    speed={500}
                    download={false}
                    plugins={[
                        lgThumbnail,
                        lgZoom,
                        lgAutoplay,
                        lgFullscreen,

                        lgRotate,
                    ]}
                    dynamic={true}
                    dynamicEl={galleryItems.map(item => ({
                        src: item.image,
                        thumb: item.image,
                        subHtml: `art by encore`
                    }))}
                >
                    {/* Hidden anchor required by LightGallery */}
                    <a href="#" style={{ display: 'none' }}></a>
                </LightGallery>

                {/* Thumbnail grid with Next.js Image */}
                <div className="columns-[300px] gap-[30px] w-full">
                    {galleryItems.map((item, index) => (
                        <div
                            key={item.id || index}
                            onClick={() => openGallery(index)}
                            className="relative w-full rounded-[10px] overflow-hidden cursor-pointer group mb-[30px]"
                        >
                            {isLoading ? (
                                <div className="w-full h-auto">
                                    <ImageSkeleton />
                                </div>
                            ) : (
                                <img
                                    src={item.image}
                                    alt={`Gallery image ${item.id}`}
                                    // fill
                                    className="object-cover group-hover:scale-105 w-full transition-transform duration-300  rounded-[10px] overflow-hidden"
                                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default ImageGalleryTabInt;
"use client";

import React, { useRef, useState, useEffect } from "react";

import { Container } from "../ui";
import LightGallery from "lightgallery/react";
import Image from "next/image";
import ImageSkeleton from "./ImageSkeleton";
import { Link } from "next-view-transitions";
import BreadCrumbs from "./BreadCrumbs";
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

const ImageGallery = (props) => {
    const { data, className = '', } = props;
    const lightGalleryRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const galleryItems = data?.data?.mainList || [];

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
        }, 3000); // 3 seconds loader time

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${className} lg:py-[100px] md:py-[80px] py-[40px] relative`}>
            <Container className="relative z-10">
                <BreadCrumbs />
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
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-[10px] gap-y-[20px] sm:gap-x-[20px] sm:gap-y-[30px]">
                    {galleryItems?.map((item, index) => (
                        <div
                            key={item.id || index}
                            onClick={() => openGallery(index)}
                            className="relative w-full sm:h-[350px] h-[250px] md:rounded-[16px] rounded-[10px] overflow-hidden cursor-pointer group"
                        >
                            {isLoading ? (
                                <ImageSkeleton />
                            ) : (
                                <Image
                                    src={item?.image}
                                    alt={`Gallery image ${item.id}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300 z-10"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </Container>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
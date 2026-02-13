"use client";

import React, { useState } from "react";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import { Container } from "../ui";
import Image from "next/image";
import BreadCrumbs from "./BreadCrumbs";
import ImageGalleryTabInt from "./ImageGalleryTabInt";
import VideoGalleryTabInt from "./VideoGalleryTabInt";

const ImageVideoGalleryInt = (props) => {
    const { data } = props;

    // Default active tab = first child
    const [activeTab, setActiveTab] = useState(
        data?.[0] || null
    );

    if (!data || data?.length === 0) return null;
    // console.log('get', data)
    
    return (
        <div className="flex flex-col lg:gap-[40px] gap-[30px] lg:py-[100px] md:py-[60px] py-[40px] relative">

            {/* Tabs */}
            <Container className="relative z-10">
                <BreadCrumbs />
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={16}
                    slidesPerGroup={1}
                    speed={500}
                    loop={false}
                    modules={[Autoplay, Pagination]}
                    pagination={{
                        el: ".custom-pagination",
                        clickable: true,
                    }}
                    className="stack-slider relative"

                >
                    {data?.map((item, i) => (
                        <SwiperSlide key={i} className='!w-auto !h-auto'>
                            <button
                                onClick={() => setActiveTab(item)}
                                className={`px-[20px] py-[16px] font-nav-16 rounded-[30px] border border-solid transition whitespace-nowrap
                                    ${activeTab?.tabTitle === item.tabTitle
                                        ? "bg-orange text-white border-orange"
                                        : "bg-transparent text-white border-white/30"
                                    }`}
                            >
                                {item.tabTitle}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>


            {/* Content - Check by key property instead of isVideo */}
            <div className="relative z-10">
                {activeTab?.key === "video" ? (
                    <VideoGalleryTabInt
                        key={`video-${activeTab.tabTitle}`}
                        mainListVideo={activeTab.list}
                    />
                ) : (
                    <ImageGalleryTabInt
                        key={`image-${activeTab.tabTitle}`}
                        mainList={activeTab.list}
                    />
                )}
            </div>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
        </div>
    );
};

export default ImageVideoGalleryInt;
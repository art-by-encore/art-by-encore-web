"use client";

import React, { useState } from "react";
import ImageGalleryTabs from "./ImageGalleryTabs";
import VideoGalleryTabs from "./VideoGalleryTabs";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import { Container } from "../ui";
import Image from "next/image";
import { Link } from "next-view-transitions";
import BreadCrumbs from "./BreadCrumbs";
const ImageVideoGallery = (props) => {
    const { data } = props;

    // Default active tab = first child
    const [activeTab, setActiveTab] = useState(
        data?.data?.childList?.[0] || null
    );

    if (!data?.data || !data?.data.childList?.length) return null;
    // console.log('activeTab', activeTab)
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
                    {data?.data?.childList.map((item, i) => (
                        <SwiperSlide key={item?.id || i} className='!w-auto !h-auto'>
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item)}
                                className={`px-[20px] py-[16px] font-nav-16 rounded-[30px] border border-solid transition
                            ${activeTab?.key === item.key
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


            {/* Content */}
            <div className="relative z-10">
                {activeTab?.isVideo ? (
                    <VideoGalleryTabs
                        key={`video-${activeTab.key}`}
                        mainListVideo={activeTab.list}
                    />
                ) : (
                    <ImageGalleryTabs
                        key={`image-${activeTab.key}`}
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

export default ImageVideoGallery;

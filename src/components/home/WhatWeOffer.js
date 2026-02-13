"use client"
import { Container } from '../ui';
import Image from 'next/image';
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import "./pagination.css";

gsap.registerPlugin(ScrollTrigger);

const WhatWeOffer = () => {
    const cards = [
        {
            id: 1,
            title: "Design.",
            text: "A design is a process of developing an item or a framework. We generally prepare various plans  for an assortment of purposes.",
            src: "https://res.cloudinary.com/ds7thn4jv/image/upload/v1770271468/compressed_1_1_bslvjh.png",
            isDark: false,
            className: 'design',
        },
        {
            id: 2,
            title: "Animation.",
            text: "Encore Art stays on top of the newest animation trends by combining the best animation methods with a unique artistic vision to create aesthetically pleasing, purposeful videos",
            src: "https://res.cloudinary.com/ds7thn4jv/image/upload/v1770388016/animation_r4bdgy.png",
            isDark: true,
            className: 'animation',
        },
        {
            id: 3,
            title: "Website Development.",
            text: "Take your business online and increase sales and leads with quality and professional web development services. To assist our clients in realizing their full digital potential, we have experience in every area of web development",
            src: "https://res.cloudinary.com/ds7thn4jv/image/upload/v1770271468/compressed_3_icd0nb.png",
            isDark: false,
            className: 'web-development',
        }
    ]
    const container = useRef(null);
    useGSAP(() => {
        const stickyCards = document.querySelectorAll(".sticky-card");

        stickyCards.forEach((card, index) => {
            if (index < stickyCards.length - 1) {
                // Pin trigger
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                    refreshPriority: -1, // ✅ added
                });
            }

            if (index < stickyCards.length - 1) {
                // Animation trigger
                ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    refreshPriority: -1, // ✅ added
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                        const afterOpacity = progress;

                        gsap.set(card, {
                            scale: scale,
                            rotation: rotation,
                            "--after-opacity": afterOpacity,
                        });
                    },
                });
            }
        });
    }, { scope: container });

    return (
        <section className='lg:pt-[80px] md:pt-[60px] pt-[40px]'>
            <div className='flex flex-col'>
                <Container>
                    <h2 className='font-title-60 text-white lg:mb-[50px] md:mb-[30px] mb-[20px]'>What We <span className='text-orange font-title-60'>Offer</span></h2>
                </Container>
                <div className="relative w-full  block lg:hidden">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
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
                        {
                            cards && cards?.map((card, i) => {
                                return (
                                    <SwiperSlide key={card?.id || i} className='w-full !h-[375px] relative p-[20px]'>
                                        <Image src={`${card?.src}`} fill className='w-full h-full object-cover' />
                                        <div className='flex flex-col items-end'>
                                            <div className={`${card?.isDark ? 'text-black' : 'text-white'} text-right flex flex-col gap-[20px] relative ${card?.className} w-full lg:mt-[82px] `}>
                                                <h2 className={`font-title-100 `}>{card?.title}</h2>
                                                <p className={`font-aside-text`}>{card?.text}</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                        <div className="slider-controler gap-[10px] mt-[30px] mx-auto z-10">
                            <div className="custom-pagination !relative flex flex-row justify-center items-center"></div>
                        </div>
                    </Swiper>

                </div>
                <div className='stack-cards sm:block hidden' ref={container}>
                    {
                        cards?.map((item, index) => {
                            return <div className='h-screen w-full relative overflow-hidden sticky-card' key={index || item?.id}>
                                <Image src={`${item?.src}`} fill className='w-full h-full object-cover' />
                                <Container className='flex flex-col items-end'>
                                    <div className={`${item?.isDark ? 'text-black' : 'text-white'} text-right flex flex-col gap-[20px] relative ${item?.className} w-full mt-[82px]`}>
                                        <h2 className={`font-title-100 `}>{item?.title}</h2>
                                        <p className={`font-aside-text`}>{item?.text}</p>
                                    </div>
                                </Container>
                            </div>
                        })
                    }
                </div>

            </div>

        </section>
    )
}

export default WhatWeOffer
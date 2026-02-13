'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Container, FallTextReveal, SmokeyCursor } from '../ui';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import "./pagination.css";
import Image from 'next/image';
import { MarqueeLR, SingleMarquee } from '../ui';
const WhoWeAre = () => {

    const titleRef = useRef(null);
    const cards = [
        {
            id: 1,
            title: "About Us",
            text: "Encore Art is a platform where your imagination meets reality. Our focus revolves around the idea of serving robust and impeccable solutions to your needs. Our polished designers make every effort to refine the concept and portray it digitally.",
        },
        {
            id: 2,
            title: "Our Vision",
            text: "Our outlook is to become a leading company in the IT industry and to climb from our current position to a more adequate spot in the market. We strive in helping them achieve their corporate goals.",
        },
        {
            id: 3,
            title: "Our Mission",
            text: "We focus on developing innovative and future-oriented software solutions for production, optimization, control and comprehensive recording of processes for quality management purposes. Our mission is to perfect every outcome the client demands",
        }
    ];

    const [cardOne, cardTwo, cardThree] = cards;
    const [isHovered, setIsHovered] = useState(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!titleRef.current) return;

        const text = titleRef.current;

        const marquee = gsap.timeline({
            repeat: -1,
            defaults: { ease: "linear" }
        })
            .fromTo(
                text,
                { x: typeof window !== "undefined" ? window.innerWidth : 500 },
                { x: () => -(text.offsetWidth + 100), duration: 12 }
            );

        return () => marquee.kill();
    }, []);


    return (
        <section className='flex flex-col lg:gap-[100px] md:gap-[60px] gap-[40px] relative lg:pb-[43px] md:pb-[60px] pb-[40px] '>
            <SmokeyCursor className='lg:block hidden' />
            {/* <div className='xl:max-w-[1600px] lg:max-w-[1022px] max-w-[767px] w-full overflow-hidden mx-auto'>
                <h1 ref={titleRef} className='text-orange font-title-211 text-center whitespace-nowrap '>
                    WHO WE ARE
                </h1>
            </div> */}
            <SingleMarquee gapClassName="gap-[50px] lg:gap-[100px]"
                speed={100}
                repeat={28} >
                <h1 className='text-orange font-title-211 text-center whitespace-nowrap'>
                    WHO WE ARE
                </h1>
                <h1 className='text-orange font-title-211 text-center whitespace-nowrap'>
                    WHO WE ARE
                </h1>
                <h1 className='text-orange font-title-211 text-center whitespace-nowrap'>
                    WHO WE ARE
                </h1>
                <h1 className='text-orange font-title-211 text-center whitespace-nowrap'>
                    WHO WE ARE
                </h1>
            </SingleMarquee>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
            <Container>
                <div className="relative w-full  block lg:hidden">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={24}
                        slidesPerGroup={1}
                        speed={500}
                        loop={false}
                        breakpoints={{
                            0: { slidesPerView: 1.1 },
                            767: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2, },
                            1024: { slidesPerView: 2, },
                            1391: { slidesPerView: 3 },
                        }}
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
                                    <SwiperSlide key={card.id || i} className='w-full !h-auto'>
                                        <div className="relative overflow-hidden flex flex-col lg:p-[40px] md:p-[30px] p-[24px] lg:rounded-[30px] md:rounded-[20px] rounded-[12px] lg:gap-[30px] gap-[20px] h-full border-white border-[1px] morph-bg-border">
                                            <div className="animate-border pointer-events-none">
                                                <span></span><span></span><span></span><span></span>
                                            </div>

                                            <div className="relative z-10 flex flex-col gap-[40px]">
                                                <h2 className="font-card-title border-b w-fit pb-[10px] text-white border-white">
                                                    {card?.title}
                                                </h2>
                                                <p className="font-card-text text-white">
                                                    {card?.text}
                                                </p>
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
                <div className='lg:grid hidden grid-cols-3 gap-x-[24px] text-white relative z-10'>

                    {/* Card One */}
                    <div className="relative overflow-hidden flex flex-col p-[40px] rounded-[30px] gap-[30px] h-fit border-white border-[1px] morph-bg-border">
                        <div className="animate-border pointer-events-none">
                            <span></span><span></span><span></span><span></span>
                        </div>

                        <div className="relative z-10 flex flex-col gap-[40px]">
                            <h2 className="font-card-title border-b w-fit pb-[10px] text-white border-white">
                                {cardOne?.title}
                            </h2>

                            <p className="font-card-text text-white">
                                {cardOne?.text}
                            </p>
                        </div>
                    </div>

                    {/* Card Two */}
                    <div className="morph-bg-border relative overflow-hidden flex flex-col p-[40px] rounded-[30px] gap-[30px] mt-[92px] h-fit border-white border-[1px]">
                        <div className="animate-border pointer-events-none">
                            <span></span><span></span><span></span><span></span>
                        </div>

                        <div className="relative z-10 flex flex-col gap-[40px]">
                            <h2 className="font-card-title border-b w-fit pb-[10px] text-white border-white">
                                {cardTwo?.title}
                            </h2>
                            <p className="font-card-text text-white">
                                {cardTwo?.text}
                            </p>
                        </div>
                    </div>

                    {/* Card Three */}
                    <div className="morph-bg-border relative overflow-hidden flex flex-col p-[40px] rounded-[30px] gap-[30px] h-fit border-white border-[1px]">
                        <div className="animate-border pointer-events-none">
                            <span></span><span></span><span></span><span></span>
                        </div>

                        <div className="relative z-10 flex flex-col gap-[40px]">
                            <h2 className="font-card-title border-b w-fit pb-[10px] text-white border-white">
                                {cardThree?.title}
                            </h2>
                            <p className="font-card-text text-white">
                                {cardThree?.text}
                            </p>
                        </div>
                    </div>

                </div>
            </Container>


            <style jsx global>{`
                :root { --color-orange: #E14807; }

                /* (your existing span border animations remain unchanged) */
                .animate-border span:nth-child(1) {
                    position: absolute; top: 0; left: 0; height: 3px; width: 100%;
                    background: linear-gradient(to right, transparent, var(--color-orange));
                    animation: borderTopAnim 2s linear infinite;
                }
                @keyframes borderTopAnim { 0%{transform:translateX(-100%);}100%{transform:translateX(100%);} }

                .animate-border span:nth-child(2) {
                    position: absolute; top: 0; right: 0; width: 3px; height: 100%;
                    background: linear-gradient(to bottom, transparent, var(--color-orange));
                    animation: borderRightAnim 2s linear infinite; animation-delay: .5s;
                }
                @keyframes borderRightAnim { 0%{transform:translateY(-100%);}100%{transform:translateY(100%);} }

                .animate-border span:nth-child(3) {
                    position: absolute; bottom: 0; right: 0; width: 100%; height: 3px;
                    background: linear-gradient(to left, transparent, var(--color-orange));
                    animation: borderBottomAnim 2s linear infinite;
                }
                @keyframes borderBottomAnim { 0%{transform:translateX(100%);}100%{transform:translateX(-100%);} }

                .animate-border span:nth-child(4) {
                    position: absolute; top: 0; left: 0; width: 3px; height: 100%;
                    background: linear-gradient(to top, transparent, var(--color-orange));
                    animation: borderLeftAnim 2s linear infinite; animation-delay: .5s;
                }
                @keyframes borderLeftAnim { 0%{transform:translateY(100%);}100%{transform:translateY(-100%);} }
            `}</style>

        </section>
    );
};

export default WhoWeAre;

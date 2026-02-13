"use client"
import React, { useState } from 'react';
import { Container } from '../ui';
import SmokeyCursor from "./SmokeyCursor";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css';
import "./pagination.css";
import Image from 'next/image';
const WhyChooseUs = () => {
    const cards = [{
        id: 1,
        title: "Certified Expert",
        text: "The project is delivered to our valued clients with full ownership rights after obtaining the go-ahead from our client and passing the testing phase.",
        gradient: "from-red-500 via-cyan-500 to-green-500",
        hoverColor: "text-red-300 border-red-300",
        textHover: "text-red-100"
    },
    {
        id: 2,
        title: "Clean Editing",
        text: "The projects are designed after extensive research, and neat illustrations, and the outcomes are immaculate and up to standard.",
        gradient: "from-cyan-400 to-purple-500",
        hoverColor: "text-cyan-300 border-cyan-300",
        textHover: "text-cyan-100"
    },
    {
        id: 3,
        title: "Affordable Price",
        text: "Our pricing is less expensive than those on the market because we don't want to burden our customers' wallets.",
        gradient: "from-green-400 via-yellow-500 to-pink-500",
        hoverColor: "text-green-300 border-green-300",
        textHover: "text-green-100"
    }
    ];

    const [isHovered, setIsHovered] = useState(null);

    return (
        <section className=' relative sm:py-[96px] py-[76px] '>
            {/* <SmokeyCursor /> */}
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
            <Container>
                <div className='flex flex-col'>
                    <h2 className='font-title-60 text-white lg:mb-[50px] md:mb-[40px] mb-[30px]'>
                        Why Choose <span className='text-orange font-title-60'>Us</span>
                    </h2>
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
                    <div className='lg:grid hidden grid-cols-1 md:grid-cols-3 gap-[25px]'>
                        {cards?.map((item, index) => (
                            <div
                                key={item?.id || index}
                                className="morph-bg-border relative overflow-hidden flex flex-col p-[40px] rounded-[30px] gap-[30px] h-auto "

                            >


                                <div className="animate-border pointer-events-none">
                                    <span></span><span></span><span></span><span></span>
                                </div>
                                {/* Content layer */}
                                <div className="relative z-10 flex flex-col gap-[30px]">
                                    <h2 className={`font-card-title border-b w-fit pb-[10px] transition-all duration-300 text-white border-white`}>
                                        {item?.title}
                                    </h2>
                                    <p className={`font-card-text transition-all duration-300 text-white`}>
                                        {item?.text}
                                    </p>
                                </div>
                            </div>
                        ))}
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
    )
}

export default WhyChooseUs;
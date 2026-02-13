'use client'
import React from 'react'
import { portfolioTabs } from '@/utils/data';
import { Container, SmokeyCursor } from '../ui';
import './portfolio-tabs.css';
import { portfolioCards } from "@/utils/data";
import { Link } from 'next-view-transitions';
import Image from 'next/image';

const PortfolioCards = (props) => {
    const { data } = props;
    const { list } = portfolioCards;
    // console.log('data', data);
    return (
        <div className='text-white lg:py-[100px] md:py-[60px] py-[40px] relative '>
            <Container>
                <div className='flex flex-col relative z-10'>
                    <div className='grid lg:flex lg:justify-center lg:flex-wrap md:grid-cols-2 grid-cols-1 lg:gap-[36px] lg:gap-x-[24px] md:gap-[24px] gap-[30px] '>
                        {
                            data?.map((item, index) => {
                                const {content} = item;
                                const {card} = content;
                                const slug = card?.pageUrl ? `portfolio/${card?.pageUrl}` : '#'
                                return <>
                                    <Link key={index} href={slug} className='w-full lg:block hidden basis-[22.5rem] h-[350px] backdrop-blur-[40px] border-border-nav border-[1px] border-solid morph-bg-border  md:rounded-[16px] rounded-[10px] relative overflow-hidden'>
                                        <div className='absolute w-full h-full flex flex-col justify-between inset-0 px-[24px] py-[36px] z-20'>
                                            <div className='flex flex-col gap-[8px]'>
                                                <h4 className=''>Category</h4>
                                                <h3 className='font-card-title'>{card?.cardTitle}</h3>
                                            </div>
                                            <button className='capitalize font-btn-text px-[14px] py-[12px] rounded-[50px] text-white bg-orange w-fit flex gap-[4px] justify-center items-center group' >
                                                <span className="translate-x-[10px] group-hover:translate-x-[0px] transition-all duration-500 ease-in-out">
                                                    {card?.ctaText}
                                                </span>
                                                <span className="-translate-x-[10px] opacity-0 group-hover:translate-x-[0px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                                    <svg width="16" height="14" viewBox="0 0 14 15" fill="none" className="rtl:rotate-180">
                                                        <path
                                                            d="M10.8888 6.87812L6.80743 2.79678L7.75802 1.84619L13.4622 7.55039L12.9869 8.02569L7.75802 13.2546L6.80743 12.304L10.8888 8.22266H0.0168457V6.87812H10.8888Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                        <Image src={card?.cardBackgroundImage} fill alt={card?.cardTitle} className='w-full h-full object-cover object-center opacity-50' />
                                        <div className="animate-border pointer-events-none">
                                            <span></span><span></span><span></span><span></span>
                                        </div>
                                    </Link>
                                    <div key={index} className='w-full lg:hidden block basis-[22.5rem] h-[350px] backdrop-blur-[40px] border-border-nav border-[1px] border-solid morph-bg-border  md:rounded-[16px] rounded-[10px] relative overflow-hidden'>
                                        <div className='absolute w-full h-full flex flex-col justify-between inset-0 px-[24px] py-[36px] z-20'>
                                            <div className='flex flex-col gap-[8px]'>
                                                <h4 className=''>Category</h4>
                                                <h3 className='font-card-title'>{card?.cardTitle}</h3>
                                            </div>
                                            <Link href={slug} className='capitalize font-btn-text px-[14px] py-[12px] rounded-[50px] text-white bg-orange w-fit flex gap-[4px] justify-center items-center group' >
                                                <span className="translate-x-[10px] group-hover:translate-x-[0px] transition-all duration-500 ease-in-out">
                                                     {card?.ctaText}
                                                </span>
                                                <span className="-translate-x-[10px] opacity-0 group-hover:translate-x-[0px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                                    <svg width="16" height="14" viewBox="0 0 14 15" fill="none" className="rtl:rotate-180">
                                                        <path
                                                            d="M10.8888 6.87812L6.80743 2.79678L7.75802 1.84619L13.4622 7.55039L12.9869 8.02569L7.75802 13.2546L6.80743 12.304L10.8888 8.22266H0.0168457V6.87812H10.8888Z"
                                                            fill="currentColor"
                                                        />
                                                    </svg>
                                                </span>
                                            </Link>
                                        </div>
                                        <Image src={card?.cardBackgroundImage} fill alt={card?.cardTitle} className='w-full h-full object-cover object-center opacity-50' />
                                        <div className="animate-border pointer-events-none">
                                            <span></span><span></span><span></span><span></span>
                                        </div>
                                    </div>
                                </>

                            })
                        }
                    </div>
                </div>
            </Container>
            <div className='abosulte w-full h-full lg:block hidden'>
                <SmokeyCursor />
            </div>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
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
        </div>
    )
}

export default PortfolioCards
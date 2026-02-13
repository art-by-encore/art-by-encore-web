"use client"
import React from 'react'
import Image from 'next/image';
import TestimonialsSplide from './TestimonialsSplide';
const Testimonials = () => {
    const data = {
        title: 'Voices of Trust',
        description: 'Stories that reflect our commitment and quality.',
        marqueeOne: [
            { id: 1, alt: 'client-1', url: '/assets/images/testimonials/client-1.png' },
            { id: 2, alt: 'client-2', url: '/assets/images/testimonials/client-2.png' },
            { id: 3, alt: 'client-3', url: '/assets/images/testimonials/client-3.png' },
            { id: 4, alt: 'client-4', url: '/assets/images/testimonials/client-4.png' },
            { id: 5, alt: 'client-5', url: '/assets/images/testimonials/client-5.png' },
            { id: 6, alt: 'client-6', url: '/assets/images/testimonials/client-6.png' },
            { id: 7, alt: 'client-7', url: '/assets/images/testimonials/client-7.png' },
            { id: 8, alt: 'client-8', url: '/assets/images/testimonials/client-8.png' },
        ],
        marqueeTwo: [
            { id: 9, alt: 'client-9', url: '/assets/images/testimonials/client-9.png' },
            { id: 10, alt: 'client-10', url: '/assets/images/testimonials/client-10.png' },
            { id: 11, alt: 'client-11', url: '/assets/images/testimonials/client-11.png' },
            { id: 12, alt: 'client-12', url: '/assets/images/testimonials/client-12.png' },
            { id: 13, alt: 'client-13', url: '/assets/images/testimonials/client-13.png' },
            { id: 14, alt: 'client-14', url: '/assets/images/testimonials/client-14.png' },
            { id: 15, alt: 'client-15', url: '/assets/images/testimonials/client-15.png' },
            { id: 16, alt: 'client-16', url: '/assets/images/testimonials/client-16.png' },
        ],
        marqueeThree: [
            { id: 18, alt: 'client-18', url: '/assets/images/testimonials/client-18.png' },
            { id: 19, alt: 'client-19', url: '/assets/images/testimonials/client-19.png' },
            { id: 20, alt: 'client-20', url: '/assets/images/testimonials/client-20.png' },
            { id: 21, alt: 'client-21', url: '/assets/images/testimonials/client-21.png' },
            { id: 22, alt: 'client-22', url: '/assets/images/testimonials/client-22.png' },
            { id: 23, alt: 'client-23', url: '/assets/images/testimonials/client-23.png' },
            { id: 24, alt: 'client-24', url: '/assets/images/testimonials/client-24.png' }
        ],
    }
    const { marqueeOne, marqueeTwo, marqueeThree } = data
    return (
        <div className=' lg:py-[100px] md:py-[60px] py-[40px] relative flex flex-col lg:gap-[40px] md:gap-[30px] gap-[20px]'>
            <div className={`relative w-full h-full flex flex-col  gap-[10px] z-10 text-white text-center px-[20px]`}>
                {data?.title && (<h1 className='font-title-60 text-white max-w-[750px]  mx-auto'>{data?.title}</h1>)}
                {data?.description && (<p className='font-banner-text text-white  max-w-[574px]  mx-auto'>{data?.description}</p>)}
            </div>
            <div className='relative flex flex-col gap-[30px] z-10'>
                <TestimonialsSplide data={marqueeOne} />
                <TestimonialsSplide data={marqueeTwo} direction={'left'} />
                <TestimonialsSplide data={marqueeThree} />
                {/* <TestimonialsSlider data={marqueeOne} />
                <TestimonialsSlider data={marqueeTwo} direction="left" />
                <TestimonialsSlider data={marqueeThree} /> */}


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

export default Testimonials
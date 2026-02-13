"use client"
import React from 'react'
import Image from 'next/image';
import { Container } from '../ui';
import CursorTrailAnimation from './CursorTrailAnimation';
const WelcomeEncore = () => {
    return (
        <CursorTrailAnimation>
            <section className='w-full relative overflow-hidden lg:py-[120px] md:py-[60px] py-[40px]'>
                <div className='w-full h-full absolute inset-0'>
                    <Image src="/assets/images/bg-welcome.svg" fill className='w-full h-full object-cover' />
                </div>
                <Container>
                    <div className='lg:h-[550px] md:h-[400px] h-[243px] relative overflow-hidden w-full morph-bg-30-border md:rounded-[20px] rounded-[12px] flex flex-col justify-center items-center'>
                        <div className="animate-border pointer-events-none">
                            <span></span><span></span><span></span><span></span>
                        </div>
                        <div className='lg:max-w-[440px] w-full lg:h-[247px] md:max-w-[357px] md:h-[200px] max-w-[220px] h-[123px] relative overflow-hidden'>
                            <Image src="/assets/images/welcome-encore-art-text.svg" fill className='object-fill' />
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
        </CursorTrailAnimation>
    )
}

export default WelcomeEncore
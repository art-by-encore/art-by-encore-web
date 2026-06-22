"use client"
import React, { useRef } from 'react'
import { Container, FallTextReveal } from '../ui'
import SmokeyCursor from "./SmokeyCursor"
import ClientVideoCard from "./ClientVideoCard"
import { useLoaderContext } from '@/app/hooks/LoaderContext'
const Banner = () => {
    const { isLoader } = useLoaderContext();
    const sectionRef = useRef(null);
    // console.log('loader', isLoader)
    return (
        <section ref={sectionRef} className='w-full relative overflow-hidden lg:min-h-[790px]'>
            {/* Video Background */}
            <div className='absolute inset-0 min-h-full w-full'>
                <video
                    src="/assets/videos/hero-video.mp4"
                    className="min-h-full h-full w-full object-cover"
                    poster='/assets/videos/banner-poster.png'
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="auto"
                    controls={false}
                    controlsList="nodownload nofullscreen noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                />
            </div>

            {/* Smokey Cursor Effect — covers full banner, tracks mouse on entire section */}
            <div className='absolute inset-0 z-[15] pointer-events-none'>
                <SmokeyCursor targetRef={sectionRef} />
            </div>


            {/* Content */}
            <Container className='relative z-20 flex w-full items-center pt-[100px] pb-[40px] sm:pt-[110px] md:pt-[120px] md:pb-[50px] lg:min-h-[790px] lg:pt-[140px] lg:pb-[30px]'>
                <div className='flex w-full flex-col lg:flex-row lg:items-center lg:justify-between gap-[24px] md:gap-[30px] lg:gap-[40px]'>
                    <div className='w-full lg:max-w-[664px] lg:pr-[25px] flex flex-col gap-[16px] md:gap-[24px] lg:gap-[30px] flex-1'>
                    <div className='flex flex-col'>

                        {
                            !isLoader && <FallTextReveal color='#ffffff'>
                                < h1 className='font-title-60 text-white'>
                                    Bringing your ideas
                                </h1>
                            </FallTextReveal>
                        }
                        {
                            !isLoader && <FallTextReveal color='#ffffff'>
                                <h1 className='font-title-60 text-white'>
                                    to life through
                                </h1>
                            </FallTextReveal>
                        }
                        {
                            !isLoader && <FallTextReveal>
                                <h1 className='font-title-80 text-orange font-semibold'>
                                    motion.
                                </h1>
                            </FallTextReveal>
                        }


                    </div>
                    {
                        !isLoader && <FallTextReveal color='#ffffff'>
                            <p className='font-banner-text text-white'>
                                At our design agency, we know how important it is to get the perfect shot – for you and your clients.
                            </p>
                        </FallTextReveal>
                    }
                    {/* {
                        !isLoader &&
                        <Button text="Get Started" />
                    } */}


                    </div>

                    {
                        !isLoader && (
                            <ClientVideoCard className="w-full sm:max-w-[440px] lg:max-w-[480px] mx-auto lg:mx-0 shrink-0" />
                        )
                    }
                </div>
            </Container>
        </section >
    )
}

export default Banner
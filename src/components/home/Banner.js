"use client"
import React from 'react'
import { Container, Button, TextAppear, FallTextReveal } from '../ui'
import SmokeyCursor from "./SmokeyCursor"
import { useLoaderContext } from '@/app/hooks/LoaderContext'
const Banner = () => {
    const { isLoader } = useLoaderContext();
    // console.log('loader', isLoader)
    return (
        <section className='w-full relative lg:h-[790px] md:h-[600px] h-[500px] overflow-hidden'>
            {/* Video Background */}
            <div className='absolute inset-0 w-full h-full'>
                <video
                    src="/assets/videos/hero-video.mp4"
                    className="h-full w-full object-cover"
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

            {/* Smokey Cursor Effect */}
            <div className='w-full h-full lg:block hidden absolute inset-0 z-10'>
                <SmokeyCursor />
            </div>


            {/* Content */}
            <Container className='flex flex-col justify-center h-full '>
                {/* <SmokeyCursor /> */}
                <div className='max-w-[664px] pr-[25px] w-full flex flex-col lg:gap-[30px] md:gap-[24px] gap-[16px] absolute   my-auto'>
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
                    {
                        !isLoader &&
                        <Button text="Get Started" />
                    }


                </div>
            </Container>
        </section >
    )
}

export default Banner
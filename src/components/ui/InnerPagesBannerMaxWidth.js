import React from 'react'
import SmokeyCursor from './SmokeyCursor';
import Image from 'next/image';
const InnerPagesBannerMaxWidth = (props) => {
    const { data, className = '' } = props;

    return (
        <div className={`${className}`}>

            <div className='lg:h-[600px] h-[500px] w-full relative 
                overflow-hidden items-center  lg:px-[76px] px-[40px] pb-[40px] flex '>
                <div className='relative z-10 w-full h-auto text-center '>
                    {data && (data?.title || data?.description) && (
                        <div className={`relative w-full h-full flex flex-col  gap-[10px] z-10 text-white  `}>
                            {data?.title && (<h1 className='font-title-60 text-white max-w-[750px]  mx-auto'>{data?.title}</h1>)}
                            {data?.description && (<p className='font-banner-text text-white  max-w-[700px]  mx-auto'>{data?.description}</p>)}
                        </div>
                    )}

                </div>

                <div className='absolute top-0 left-0 w-full h-full bg-primary-3 overflow-hidden'>
                    {/* desktop */}
                    <video
                        src={data?.videoUrl}
                        className="h-full w-full object-cover"
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
                    <div className='relative w-full h-full'>
                        <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                    </div>
                </div>
                <div>

                </div>
                <SmokeyCursor className='lg:block hidden' />
            </div>
        </div>
    )
}

export default InnerPagesBannerMaxWidth
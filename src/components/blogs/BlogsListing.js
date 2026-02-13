"use client"
import React, { useState } from 'react'
import { Container, SmokeyCursor, NoDataFound } from '../ui';
import Image from 'next/image';
import { Link } from 'next-view-transitions';

const BlogsListing = (props) => {
    const { list = [] } = props;
    const INITIAL_COUNT = 6;
    const LOAD_MORE_COUNT = 3;

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
    };

    const visibleList = list.slice(0, visibleCount);
    const isLastItem = visibleCount >= list.length;

    if (!list.length) {
        return (
            <div className='lg:py-[100px] md:py-[60px] py-[40px] relative'>
                <Container className='relative z-10 flex justify-center items-center'>
                    <NoDataFound />
                </Container>
                <div className='abosulte w-full h-full lg:block hidden'>
                    <SmokeyCursor />
                </div>
                <div className='absolute w-full h-full inset-0'>
                    <div className='relative w-full h-full'>
                        <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                    </div>
                </div>
            </div>
        );
    }
   
    return (
        <div className='lg:py-[100px] md:py-[60px] py-[40px] relative'>
            <Container className='relative z-10 flex flex-col gap-[30px] justify-center items-center w-full'>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-y-[36px] lg:gap-x-[24px] md:gap-[24px] gap-[30px] w-full">
                    {visibleList?.map((item, index) => {
                        const title = item.content?.title;
                        const date = item.content?.createdDate;
                        const category = item.content?.tags?.[0]?.text || "";
                        const href = item.content?.cta?.slug || item.slug;
                        const isDateAvailable = !!date;

                        return (
                            <>
                                {/* Desktop / Large Screens */}
                                <Link
                                    href={`blogs/${item.content?.cta?.slug}` || '#'}
                                    key={`${item.id}-${title}-${index}`}
                                    className="lg:flex hidden flex-col gap-[10px] cursor-pointer"
                                >
                                    <div className="relative w-full flex flex-col justify-center items-center lg:h-[225px] bg-border-nav md:h-[200px] h-[180px] sm:rounded-[16px] rounded-[10px] overflow-hidden">
                                        {item.content?.thumbImage ? (
                                            <Image
                                                fill
                                                src={item.content.thumbImage}
                                                alt={title || "cover image"}
                                                className="object-cover"
                                                priority={index < 3}
                                            />
                                        ) : (
                                            <div className="relative sm:w-[264px] w-[150px] sm:h-[80px] h-[50px]">
                                                <Image
                                                    fill
                                                    src={"/assets/icons/logo.svg"}
                                                    alt={title || "cover image"}
                                                    className="objec-fill"
                                                    priority={index < 3}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-[10px]">
                                        {title && (
                                            <div className="w-full text-white">
                                                <h3 className="font-card-title line-clamp-3">
                                                    {title}
                                                </h3>
                                            </div>
                                        )}

                                        <Link
                                            href={`blogs/${item.content?.cta?.slug}` || '#'}
                                            className="font-card-text capitalize text-orange flex gap-[10px] items-center group"
                                        >
                                            <span className="pb-[2px]">{item.content?.cta?.text || "read more"}</span>
                                            <span className="group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                                                <svg
                                                    className="rtl:rotate-180"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M12.9376 7.20001L8.0808 2.34321L9.212 1.21201L16 8.00001L15.4344 8.56561L9.212 14.788L8.0808 13.6568L12.9376 8.80001H0V7.20001H12.9376Z"
                                                        className='fill-orange'
                                                    />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </Link>

                                {/* Mobile / Small Screens */}
                                <div
                                    key={`${item.id}-${title}-${index}`}
                                    className="flex lg:hidden flex-col gap-[10px]"
                                >
                                    <div className="relative w-full flex flex-col justify-center items-center lg:h-[225px] bg-border-nav md:h-[200px] h-[180px] sm:rounded-[16px] rounded-[10px] overflow-hidden">
                                        {item.content?.thumbImage ? (
                                            <Image
                                                fill
                                                src={item.content.thumbImage}
                                                alt={title || "cover image"}
                                                className="object-cover"
                                                priority={index < 3}
                                            />
                                        ) : (
                                            <div className="relative sm:w-[264px] w-[150px] sm:h-[80px] h-[50px]">
                                                <Image
                                                    fill
                                                    src={"/assets/icons/logo.svg"}
                                                    alt={title || "cover image"}
                                                    className="objec-fill"
                                                    priority={index < 3}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-[10px]">
                                        {title && (
                                            <div className="w-full text-white">
                                                <h3 className="font-card-title line-clamp-3">
                                                    {title}
                                                </h3>
                                            </div>
                                        )}

                                        <Link
                                            href={item.content?.cta?.slug || '#'}
                                            className="font-card-text capitalize text-orange flex gap-[10px] items-center group"
                                        >
                                            <span className="pb-[2px]">{item.content?.cta?.text || "read more"}</span>
                                            <span className="group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                                                <svg
                                                    className="rtl:rotate-180"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 16 16"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M12.9376 7.20001L8.0808 2.34321L9.212 1.21201L16 8.00001L15.4344 8.56561L9.212 14.788L8.0808 13.6568L12.9376 8.80001H0V7.20001H12.9376Z"
                                                        className='fill-orange'
                                                    />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        );
                    })}


                </div>
                {!isLastItem && (
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        className="capitalize w-fit font-footer-title px-[11px] py-[14px] rounded-[8px] text-white bg-orange flex gap-[4px] justify-center items-center group"
                    >
                        <span className="translate-x-[10px] group-hover:translate-x-[0px] transition-all duration-500 ease-in-out">
                            Load more
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
                )}
            </Container>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
        </div>
    )
}

export default BlogsListing
"use client"
import React from 'react'
import { Container } from '../ui';
import Link from 'next/link';
import Image from 'next/image';
const BlogsDetails = (props) => {
    const { content } = props;

    const { title, description, tags, urls, cta } = content;
    return (
        <div className='lg:py-[100px] md:py-[80px] py-[40px] relative'>
            <Container className='relative z-10 text-white'>
                <ul className='flex text-white flex-row flex-wrap font-footer-text gap-[10px] mb-[20px]'>
                    <li className=''>
                        <Link href='/blogs' >Blogs</Link>
                    </li>
                    <li>/</li>
                    <li className='text-orange underline'>
                        <Link href={cta?.slug || '#'} className='' >{title}</Link>
                    </li>
                </ul>
                <div className='flex flex-col md:gap-[40px] gap-[30px]'>
                    <div className=' flex flex-col sm:gap-[16px] gap-[10px]'>
                        <h2 className='font-card-title'>{title}</h2>
                        <div className='flex flex-col sm:gap-[16px] gap-[10px]'>
                            {
                                description?.map((item, index) => {
                                    return <p className='font-card-text max-w-[1030px] w-full' key={index}>
                                        {
                                            item?.text
                                        }
                                    </p>
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-wrap flex-row gap-[20px]'>
                        <h3 className='font-card-title'>{tags?.text} :</h3>
                        <ul className='flex flex-row gap-[10px] flex-wrap'>
                            {
                                tags?.list?.map((item, index) => {
                                    return <li className='font-footer-title py-[14px] px-[10px] flex justify-center items-center bg-orange rounded-[100px]' key={index}>{item?.text}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </Container>
            <div className='absolute w-full h-full inset-0'>
                <div className='relative w-full h-full'>
                    <Image fill alt="bg" className="" src={'/assets/images/bg-gradient.png'} />
                </div>
            </div>
        </div>
    )
}

export default BlogsDetails
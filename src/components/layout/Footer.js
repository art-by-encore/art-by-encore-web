"use client"
import React from 'react'
import { Container, Button } from '../ui'
import Image from 'next/image'
import Link from 'next/link'
import NavRollText from './NavRollText'
const Footer = () => {
    const pages = {
        title: "Our Pages",
        urls: [{
            id: 1,
            url: "/home",
            text: "Home"
        },
        {
            id: 2,
            url: "/portfolio",
            text: "Our Portfolio"
        },
        {
            id: 3,
            url: "/contact-us",
            text: "Contact Us"
        },
        {
            id: 4,
            url: "/testimonials",
            text: "Testimonials"
        }
        ]
    }
    const quickLinks = {
        title: "Quick Links",
        urls: [{
            id: 1,
            url: "/blogs",
            text: "Blogs"
        },

        ]
    }
    const address = {
        title: "Work Hours",
        urls: [{
            id: 1,
            url: "/",
            text: "Mon- Sat (07:00 - 12:30)"
        },
        ]
    }
    const socialLinks = {
        title: "Quick Links",
        urls: [{
            id: 1,
            url: "/",
            text: "Instagram",
            src: "/assets/icons/Instagram.svg"
        },
        {
            id: 2,
            url: "/",
            text: "Facebook",
            src: "/assets/icons/Facebook.svg"
        },
        {
            id: 3,
            url: "/",
            text: "Email",
            src: "/assets/icons/EnvelopeSimpleOpen.svg"
        },
        ]
    }
    const currentYear = new Date();
    return (
        <footer className='pt-[70px] pb-[50px]'>
            <Container>
                <div className='flex lg:flex-row flex-col justify-between lg:gap-0 gap-[40px]'>
                    <div className="flex flex-row lg:flex-col justify-between items-center lg:justify-start gap-[20px]
                max-[395px]:flex-col max-[395px]:items-start">
                        <Link
                            href="/"
                            className="relative block sm:w-[264px] w-[150px] shrink-0 sm:h-[80px] h-[50px]"
                        >
                            <Image src="/assets/icons/logo.svg" fill alt="art by encore" />
                        </Link>

                        <Button text="Contact Us" />
                    </div>
                    <div className='max-w-[817px] w-full flex flex-col '>
                        <div className='sm:flex flex-row justify-between grid grid-cols-2 gap-[30px]'>
                            <div className='flex flex-col gap-[20px] sm:max-w-[205px] w-full'>
                                <h3 className='text-white font-footer-title'>{pages?.title}</h3>
                                <ul className='flex flex-col gap-[16px]'>
                                    {
                                        pages?.urls?.map((item, index) => {
                                            return <li key={index || item?.id}>
                                                <Link className='text-white font-footer-text  inline-block' href={item?.url}>
                                                    <NavRollText text={item?.text} />
                                                </Link>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className='flex flex-col gap-[20px] sm:max-w-[205px] w-full'>
                                <h3 className='text-white font-footer-title'>{quickLinks?.title}</h3>
                                <ul className='flex flex-col gap-[16px]'>
                                    {
                                        quickLinks?.urls?.map((item, index) => {
                                            return <li key={index || item?.id}>
                                                <Link className='text-white font-footer-text  inline-block' href={item?.url}>
                                                    <NavRollText text={item?.text} />
                                                </Link>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                            <div className='flex flex-col gap-[20px] sm:max-w-[205px] w-full sm:col-span-1 col-span-2'>
                                <h3 className='text-white font-footer-title'>{address?.title}</h3>
                                <ul className='flex flex-col gap-[16px]'>
                                    {
                                        address?.urls?.map((item, index) => {
                                            return <li key={index || item?.id}>
                                                <Link className='text-white font-footer-text  inline-block' href={item?.url}>
                                                    <NavRollText text={item?.text} />
                                                </Link>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className='w-full h-[1px] bg-white my-[30px]'></div>
                        <div className='flex sm:flex-row flex-col gap-[30px] lg:gap-[17px] md:gap-[60px] items-center sm:flex-nowrap flex-wrap'>
                            <ul className='flex flex-row gap-[6px]'>
                                {
                                    socialLinks?.urls?.map((item, index) => {
                                        return <li key={index || item?.id}>
                                            <Link href={item?.url} className='border-[1px] border-white  rounded-[20px] w-[76px] h-[40px] grid place-content-center'>
                                                <span className='relative w-[16px] h-[16px]'>
                                                    <Image src={item?.src} fill alt="socials" className='w-full h-full object-contain' />
                                                </span>
                                            </Link>
                                        </li>
                                    })
                                }
                            </ul>
                            <p className='font-footer-copy-text text-white sm:text-left text-center'>Copyright © {`${currentYear?.getFullYear()}`} Encore Marketing & Developers. All Rights Reserved</p>
                        </div>
                    </div>
                </div>
            </Container>

        </footer>
    )
}

export default Footer
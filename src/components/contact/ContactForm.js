'use client'
import React from 'react'
import Image from 'next/image'
import { Container, Button, TextAppear, SmokeyCursor } from '../ui'
import Link from 'next/link'
import Form from "./Form";

const ContactForm = () => {

    const url = `https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d362390.35031564994!2d-106.954917!3d44.79763!3m2!1i1024!2i768!4f13.1!2m1!1sENCORE%20LLC%2030N%20GOULD%20ST%20STE%2035973%20SHERIDAN%2C%20WY%2082801!5e0!3m2!1sen!2sus!4v1769686011912!5m2!1sen!2sus
`

    return (
        <div className={`lg:py-[100px] md:py-[60px] py-[40px] relative`}>
            <Container className='relative z-10'>
                <div className="flex flex-col justify-center items-center w-full ">
                    {/* Left Side */}
                    <div className="relative flex flex-col text-white max-w-[700px]  w-full  gap-[30px] backdrop-blur-[40px] border-border-nav border-[1px] border-solid morph-bg-border  md:rounded-[16px] rounded-[10px] sm:p-[30px] p-[20px]  overflow-hidden">
                        <div className='flex flex-col gap-[30px] relative z-10'>
                            {/* address card */}
                            <div className='flex flex-col gap-[30px]'>
                                <div className='flex flex-row gap-[12px]'>
                                    <div className='w-[32px] h-[32px] relative flex items-center justify-center'>
                                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.9997 18.6667C18.2088 18.6667 19.9997 16.8758 19.9997 14.6667C19.9997 12.4575 18.2088 10.6667 15.9997 10.6667C13.7905 10.6667 11.9997 12.4575 11.9997 14.6667C11.9997 16.8758 13.7905 18.6667 15.9997 18.6667Z" stroke="#FF7800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M15.9997 28C21.8907 25.3333 26.6663 20.5577 26.6663 14.6667C26.6663 8.77563 21.8907 4 15.9997 4C10.1086 4 5.33301 8.77563 5.33301 14.6667C5.33301 20.5577 10.1086 25.3333 15.9997 28Z" stroke="#FF7800" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

                                    </div>
                                    <p className='font-card-text  lg:w-[80%] sm:w-[70%] w-[95%]'>
                                        77 Rea Road, NorthField Birmingham, West Midlands, UK B31 2PQ
                                    </p>
                                </div>
                                <div className='grid sm:grid-cols-2 grid-cols-1 gap-[30px]'>
                                    <div className='w-full flex flex-col gap-[8px]'>
                                        <h5 className='capitalize font-btn-text '>Email Us</h5>
                                        <Link className='font-card-text  break-words sm:break-normal' href={`emailto: artbyencore1@gmail.com `} target=''>
                                            artbyencore1@gmail.com
                                        </Link>
                                    </div>
                                    <div className='w-full flex flex-col gap-[8px]'>
                                        <h5 className='capitalize font-btn-text '>Call Us</h5>
                                        <Link className='font-card-text ' href={`tel:+44 787 876 1204 `} target=''>
                                            +44 787 876 1204
                                        </Link>
                                    </div>


                                </div>
                            </div>
                            <hr />
                            {/* form */}
                            <div className='flex flex-col w-full sm:gap-[50px] gap-[30px]'>
                                <h3 className="font-card-title">
                                    Send Us A Message
                                </h3>
                                <Form />
                            </div>
                        </div>
                        <div className="animate-border pointer-events-none">
                            <span></span><span></span><span></span><span></span>
                        </div>
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

export default ContactForm
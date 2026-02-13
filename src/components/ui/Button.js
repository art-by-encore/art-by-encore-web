// Button.jsx
import React from 'react';
import Link from 'next/link';
const Button = (props) => {
    const { text, type = "button", action, link = '#' } = props;
    
    return (
        <button type={type} onClick={action} className="h-fit morph-bg-border text-white flex justify-between items-center shrink-0 font-btn-text gap-[30px] w-fit py-[8px] rounded-[50px] pl-[24px] pr-[8px]">
            {text}
            <span className='sm:w-[40px] sm:h-[40px] w-[32px] h-[32px] rounded-[50%] border-[1px] border-white grid place-content-center'>
                <svg className='sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4868 5.13879V13.0937C15.4868 13.2596 15.4209 13.4187 15.3036 13.5359C15.1863 13.6532 15.0273 13.7191 14.8614 13.7191C14.6956 13.7191 14.5365 13.6532 14.4192 13.5359C14.302 13.4187 14.2361 13.2596 14.2361 13.0937L14.2366 6.64747L5.58065 15.3035C5.46344 15.4207 5.30446 15.4865 5.1387 15.4865C4.97294 15.4865 4.81397 15.4207 4.69676 15.3035C4.57955 15.1862 4.5137 15.0273 4.5137 14.8615C4.5137 14.6957 4.57955 14.5368 4.69676 14.4196L13.3527 5.76359L6.90647 5.76414C6.74062 5.76414 6.58156 5.69826 6.46428 5.58098C6.34701 5.4637 6.28112 5.30465 6.28112 5.13879C6.28112 4.97294 6.34701 4.81388 6.46428 4.6966C6.58156 4.57933 6.74062 4.51344 6.90647 4.51344L14.8614 4.51344C14.9436 4.5134 15.0249 4.52954 15.1008 4.56095C15.1767 4.59236 15.2456 4.63843 15.3037 4.6965C15.3618 4.75458 15.4079 4.82354 15.4393 4.89943C15.4707 4.97532 15.4868 5.05666 15.4868 5.13879Z" fill="white" />
                </svg>
            </span>
        </button>
    );
};
export default Button
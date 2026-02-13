'use client'
import React, { useState } from 'react'
import { Container } from '../ui'
import Image from 'next/image'
import Link from 'next/link'
import NavRollText from './NavRollText'
const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { id: 1, text: 'Home', link: '/home' },
    { id: 2, text: 'Our Portfolio', link: '/portfolio' },
    { id: 3, text: 'Testimonials', link: '/testimonials' },
    { id: 4, text: 'Contact Us', link: '/contact-us' },
  ]

  return (
    <>
      {/* HEADER */}
      <header className="lg:top-[50px] top-[30px] inset-x-0 absolute w-full z-50">
        <Container>
          <nav className="flex justify-between items-center">
            <Link
              href="/"
              className="relative sm:w-[264px] w-[150px] sm:h-[80px] h-[50px]"
            >
              <Image src="/assets/icons/logo.svg" alt="art by encore" fill />
            </Link>

            {/* Desktop Nav */}
            <ul className="lg:flex hidden backdrop-blur-[40px] rounded-[50px] border border-border-nav">
              {navLinks.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.link}
                    className="font-nav-16 text-white px-[20px] py-[18px] inline-block"
                  >
                    <NavRollText text={item.text} />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden backdrop-blur-[40px] rounded-full border border-border-nav p-[14px]"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="M3.333 14.167h13.334M3.333 10h13.334M3.333 5.833h13.334"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </nav>
        </Container>
      </header>

      {/* OVERLAY */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      />

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[520px] bg-black z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center p-5 border-b border-white/10">
          <Link
            href="/"
            className="relative  w-[150px]  h-[50px]"
          >
            <Image src="/assets/icons/logo.svg" alt="art by encore" fill />
          </Link>
          <button onClick={() => setIsOpen(false)}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col p-6 gap-6">
          {navLinks.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="font-nav-16 text-white"
              >
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Header

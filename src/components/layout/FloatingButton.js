"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { RollText } from "../ui";

const menuItems = [
  { id: 1, icon: "/assets/icons/paypal-w.svg", href: "https://paypal.me/encoremndLTD/", text: "Paypal" },
  { id: 2, icon: "/assets/icons/stripe-w.svg", href: "https://buy.stripe.com/28oeXee8g8377xC6oo", text: "Stripe" },
  { id: 3, icon: "/assets/icons/wise-w.svg", href: "https://wise.com/pay/business/encoremndltd", text: "Wise" },
];

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-4 pb-4"
            >
              <div className="backdrop-blur-[40px] overflow-hidden morph-bg-border bg-black/50 border border-border-nav rounded-lg shadow-xl p-2 min-w-[220px] relative z-10">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ x: 3 }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-md transition-all bg-white/10 backdrop-blur-xl border border-border-nav hover:bg-white/20 shadow-lg mb-1"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-8 h-8 relative flex-shrink-0">
                        <Image
                          src={item.icon}
                          alt={item.text}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <span className="font-nav-16 text-white flex-grow">
                        <RollText text={item.text} />
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
                <div className="animate-border pointer-events-none">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

              <div
                className="absolute -bottom-1 right-8 w-3 h-3 rotate-45 shadow-xl"
                style={{ backgroundColor: "#e14807" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={toggleMenu}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          aria-expanded={isOpen}
          aria-label="Pay Now"
          className="payment-float-btn relative overflow-hidden flex items-center gap-[12px] pl-[16px] pr-[20px] py-[14px] min-h-[60px] rounded-[50px] bg-orange border-white border-[1px] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-black"
        >
          <div className="payment-animate-border pointer-events-none">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="relative z-10 flex items-center gap-[12px]">
            <div className="w-[32px] h-[32px] relative flex-shrink-0">
              <Image
                src="/assets/icons/payment-w.svg"
                alt="Payment"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-btn-text whitespace-nowrap">Pay Now</span>
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-[14px] h-[14px] flex-shrink-0"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 5.25L7 8.75L10.5 5.25"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </motion.button>
      </div>

      <style jsx global>{`
        :root {
          --color-orange: #e14807;
        }

        .payment-float-btn {
          animation: paymentGlow 2.2s ease-in-out infinite;
        }

        @keyframes paymentGlow {
          0%,
          100% {
            box-shadow:
              0 0 16px rgba(225, 72, 7, 0.45),
              0 8px 24px rgba(0, 0, 0, 0.35);
          }
          50% {
            box-shadow:
              0 0 28px rgba(225, 72, 7, 0.8),
              0 0 48px rgba(225, 72, 7, 0.35),
              0 8px 24px rgba(0, 0, 0, 0.35);
          }
        }

        .payment-animate-border span:nth-child(1) {
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          width: 100%;
          background: linear-gradient(to right, transparent, #ffffff);
          animation: paymentBorderTopAnim 2s linear infinite;
        }
        @keyframes paymentBorderTopAnim {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .payment-animate-border span:nth-child(2) {
          position: absolute;
          top: 0;
          right: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, #ffffff);
          animation: paymentBorderRightAnim 2s linear infinite;
          animation-delay: 0.5s;
        }
        @keyframes paymentBorderRightAnim {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .payment-animate-border span:nth-child(3) {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to left, transparent, #ffffff);
          animation: paymentBorderBottomAnim 2s linear infinite;
        }
        @keyframes paymentBorderBottomAnim {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .payment-animate-border span:nth-child(4) {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to top, transparent, #ffffff);
          animation: paymentBorderLeftAnim 2s linear infinite;
          animation-delay: 0.5s;
        }
        @keyframes paymentBorderLeftAnim {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .animate-border span:nth-child(1) {
          position: absolute;
          top: 0;
          left: 0;
          height: 3px;
          width: 100%;
          background: linear-gradient(to right, transparent, var(--color-orange));
          animation: borderTopAnim 2s linear infinite;
        }
        @keyframes borderTopAnim {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-border span:nth-child(2) {
          position: absolute;
          top: 0;
          right: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, var(--color-orange));
          animation: borderRightAnim 2s linear infinite;
          animation-delay: 0.5s;
        }
        @keyframes borderRightAnim {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-border span:nth-child(3) {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to left, transparent, var(--color-orange));
          animation: borderBottomAnim 2s linear infinite;
        }
        @keyframes borderBottomAnim {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-border span:nth-child(4) {
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(to top, transparent, var(--color-orange));
          animation: borderLeftAnim 2s linear infinite;
          animation-delay: 0.5s;
        }
        @keyframes borderLeftAnim {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingButton;

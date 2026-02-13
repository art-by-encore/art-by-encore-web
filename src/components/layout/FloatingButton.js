"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RollText } from '../ui';
const menuItems = [
  { id: 1, icon: '/assets/icons/paypal-w.svg', href: 'https://paypal.me/encoremndLTD/', text: 'Paypal' },
  { id: 2, icon: '/assets/icons/stripe-w.svg', href: 'https://buy.stripe.com/28oeXee8g8377xC6oo', text: 'Stripe' },
  { id: 3, icon: '/assets/icons/wise-w.svg', href: 'https://wise.com/pay/business/encoremndltd', text: 'Wise' },
];

const FloatingButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Wrap both button and menu in a container that handles hover */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Menu Items - Appear on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 20, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 20, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-4"
            >
              <div className="backdrop-blur-[40px] overflow-hidden morph-bg-border bg-black/50 border border-border-nav rounded-lg shadow-xl p-2 min-w-[220px] relative z-10">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 3 }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-md transition-all
           bg-white/10 backdrop-blur-xl border
           border-border-nav
           hover:bg-white/20
           shadow-lg mb-1"
                      onClick={() => setIsHovered(false)}
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
                        {/* {item.text} */}
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
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>

              {/* Small arrow pointing to button with orange color */}
              <div className="absolute -bottom-1 right-6 transform w-3 h-3 rotate-45 shadow-xl" style={{ backgroundColor: '#e14807' }}></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button with #e14807 color */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full backdrop-blur-[40px] border border-border-nav shadow-lg flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2 "
        >
          <motion.div
            // animate={{ rotate: isHovered ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/assets/icons/payment-svg.svg" alt="wise" width={42} height={42} />

          </motion.div>
        </motion.button>
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
  );
};

export default FloatingButton;
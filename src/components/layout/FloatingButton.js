"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const menuItems = [
  { id: 1, icon: '/assets/icons/paypal-svg.svg', href: 'https://paypal.me/encoremndLTD/', text: 'Paypal' },
  { id: 2, icon: '/assets/icons/stripe-svg.svg', href: 'https://buy.stripe.com/28oeXee8g8377xC6oo', text: 'Stripe' },
  { id: 3, icon: '/assets/icons/wise.png', href: 'https://wise.com/pay/business/encoremndltd', text: 'Wise' },
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
              <div className="bg-orange rounded-lg shadow-xl p-2 min-w-[220px] relative z-10">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-md transition-colors"
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
                      <span className="text-gray-700 font-medium flex-grow">
                        {item.text}
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
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ 
            backgroundColor: '#e14807',
            focusRingColor: '#e14807'
          }}
        >
          <motion.div
            animate={{ rotate: isHovered ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
              />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
};

export default FloatingButton;
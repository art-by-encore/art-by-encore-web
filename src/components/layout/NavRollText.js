'use client'
import { motion } from 'framer-motion'

const NavRollText = ({ text, className = '' }) => {
  const formattedText = text
    ?.toLowerCase()
    ?.replace(/\b\w/g, c => c.toUpperCase())

  return (
    <motion.span
      className={`inline-flex overflow-hidden ${className}`}
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {formattedText?.split('').map((char, i) => {
        const direction = i % 2 === 0 ? -100 : 100

        return (
          <span key={i} className="relative inline-block overflow-hidden">
            {/* Original */}
            <motion.span
              className="block"
              variants={{
                rest: { y: '0%' },
                hover: { y: `${direction}%` },
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>

            {/* Clone */}
            <motion.span
              className="absolute inset-0 block"
              variants={{
                rest: { y: `${-direction}%`, color: 'var(--color-white)' },
                hover: { y: '0%', color: 'var(--color-orange)' },
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        )
      })}
    </motion.span>
  )
}

export default NavRollText

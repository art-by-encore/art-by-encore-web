'use client'
import React, { useRef, useEffect, useCallback, useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const useAnimationFrame = (callback) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== null) {
      const delta = time - previousTimeRef.current;
      callback(time, delta);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};

export function Marquee({
  className,
  pauseOnHover = false,
  children,
  speed = 50,
  vertical = false,
  repeat = 6, // Increased default
  gapClassName = "",
  ...props
}) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const animX = useRef(0);
  const isPaused = useRef(false);
  const [itemWidth, setItemWidth] = useState(0);
  const [computedGap, setComputedGap] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [totalSetWidth, setTotalSetWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current && contentRef.current.children.length > 0) {
        const firstItem = contentRef.current.children[0];
        if (firstItem) {
          const width = firstItem.offsetWidth;
          setItemWidth(width);
          
          const computedStyle = window.getComputedStyle(contentRef.current);
          const gapValue = computedStyle.gap;
          let gapNum = 0;
          if (gapValue) {
            const gapMatch = gapValue.match(/(\d+(\.\d+)?)/);
            if (gapMatch) {
              gapNum = parseFloat(gapMatch[1]);
              setComputedGap(gapNum);
            }
          }
          
          const itemCount = React.Children.count(children);
          const totalWidth = (width * itemCount) + (gapNum * (itemCount - 1));
          setTotalSetWidth(totalWidth);
        }
      }
      setIsInitialized(true);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    const timer = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearTimeout(timer);
    };
  }, [children]);

  useAnimationFrame((t, delta) => {
    if (!contentRef.current || !isInitialized || totalSetWidth === 0) return;
    
    if (pauseOnHover && isPaused.current) return;

    const dx = (speed * delta) / 1000;
    
    // Move left
    animX.current -= dx;
    
    // Seamless reset: when one set moves completely out, jump it back
    // This creates perfect looping
    if (Math.abs(animX.current) >= totalSetWidth) {
      animX.current += totalSetWidth;
    }

    contentRef.current.style.transform = `translateX(${animX.current}px)`;
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) isPaused.current = true;
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) isPaused.current = false;
  }, [pauseOnHover]);

  const childrenArray = React.Children.toArray(children);

  // Calculate optimal repeat count - ensure at least 3 sets for smoothness
  const optimalRepeat = Math.max(repeat, 3);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn("flex overflow-hidden w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={contentRef}
        className={cn(
          "flex shrink-0 items-center",
          vertical ? "flex-col" : "flex-row",
          gapClassName
        )}
        style={{ 
          willChange: 'transform'
        }}
      >
        {Array.from({ length: optimalRepeat }).map((_, repeatIndex) => (
          <React.Fragment key={`repeat-${repeatIndex}`}>
            {childrenArray.map((child, childIndex) => (
              <div 
                key={`${repeatIndex}-${childIndex}`}
                className="flex-shrink-0"
              >
                {child}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
'use client'
import React, { useRef, useEffect, useCallback, useState } from "react";

// cn utility function
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const useAnimationFrame = (callback) => {
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== null && previousTimeRef.current !== undefined) {
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
  repeat = 4,
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

  // Measure items and gap on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current && contentRef.current.children.length > 0) {
        const firstItem = contentRef.current.children[0];
        if (firstItem) {
          setItemWidth(firstItem.offsetWidth);
          
          // Get computed gap from CSS
          const computedStyle = window.getComputedStyle(contentRef.current);
          const gapValue = computedStyle.gap;
          if (gapValue) {
            const gapMatch = gapValue.match(/(\d+(\.\d+)?)/);
            if (gapMatch) {
              const gapNum = parseFloat(gapMatch[1]);
              setComputedGap(gapNum);
            }
          }
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
    if (!containerRef.current || !contentRef.current || itemWidth === 0 || !isInitialized) return;
    
    if (pauseOnHover && isPaused.current) {
      return;
    }

    // Calculate total width of one set of items
    const itemCount = React.Children.count(children);
    const totalSetWidth = (itemWidth * itemCount) + (computedGap * (itemCount - 1));
    
    if (totalSetWidth === 0) return;

    const dx = (speed * delta) / 1000;
    
    // Move to the left (negative direction)
    animX.current -= dx;
    
    // Reset when we've moved one full set to the left
    if (animX.current <= -totalSetWidth) {
      animX.current = 0;
    }

    contentRef.current.style.transform = `translateX(${animX.current}px)`;
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = true;
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      isPaused.current = false;
    }
  }, [pauseOnHover]);

  // Convert children to array
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "flex overflow-hidden w-full",
        className,
      )}
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
        {/* Render multiple sets for seamless looping */}
        {Array.from({ length: repeat }).map((_, repeatIndex) => (
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
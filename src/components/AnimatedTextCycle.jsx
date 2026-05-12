import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnimatedTextCycle({
  words,
  interval = 4000,
  className = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState("auto");
  const measureRef = useRef(null);

  useEffect(() => {
    if (measureRef.current) {
      const elements = measureRef.current.children;
      if (elements.length > currentIndex) {
        const newWidth = elements[currentIndex].getBoundingClientRect().width;
        setWidth(`${newWidth}px`);
      }
    }
  }, [currentIndex, words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, words.length]);

  const containerVariants = {
    hidden: { 
      y: "40%", 
      opacity: 0, 
      filter: "blur(12px)",
    },
    visible: { 
      y: "0%", 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
    exit: { 
      y: "-40%", 
      opacity: 0, 
      filter: "blur(12px)",
      transition: { 
        duration: 0.6, 
        ease: [0.7, 0, 0.84, 0] 
      }
    },
  };

  return (
    <span className="relative inline-flex items-baseline">
      <div 
        ref={measureRef} 
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none whitespace-nowrap"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={className}>
            {word}
          </span>
        ))}
      </div>

      <motion.span 
        className="relative inline-block overflow-visible"
        animate={{ 
          width,
          transition: { 
            type: "spring",
            stiffness: 120,
            damping: 20,
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ 
              whiteSpace: "nowrap",
              display: "block" 
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
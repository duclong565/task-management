"use client";

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  speed: number;
  delay: number;
}

interface HeartRainProps {
  isActive: boolean;
}

export default function HeartRain({ isActive }: HeartRainProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Start with a clean slate when activated
      setIsFadingOut(false);
      
      // Create hearts with staggered delays for a natural rain effect
      const initialHearts = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 300, // Start above the viewport
        size: Math.random() * (30 - 10) + 10,
        opacity: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360,
        speed: Math.random() * (5 - 2) + 2,
        delay: Math.random() * 1000
      }));

      setHearts(initialHearts);
    } else if (hearts.length > 0) {
      // When deactivated but hearts exist, start fade out instead of immediate removal
      setIsFadingOut(true);
    }
  }, [isActive]);

  useEffect(() => {
    // Animation loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 16; // Normalize to ~60fps
      lastTime = currentTime;

      setHearts(prevHearts => {
        // If no hearts left, stop animation
        if (prevHearts.length === 0) return prevHearts;
        
        const updatedHearts = prevHearts.map(heart => {
          // Don't start moving until delay has passed
          if (heart.delay > 0) {
            return { ...heart, delay: heart.delay - deltaTime * 16 };
          }

          const newY = heart.y + heart.speed * deltaTime;
          let newOpacity = heart.opacity;
          
          // If we're in fading out mode, reduce opacity gradually
          if (isFadingOut) {
            newOpacity = Math.max(0, heart.opacity - 0.01 * deltaTime);
          }
          
          // Remove hearts that are off-screen or fully transparent
          if (newY > window.innerHeight + 100 || newOpacity <= 0) {
            return null;
          }

          return {
            ...heart,
            y: newY,
            x: heart.x + Math.sin(newY / 50) * 0.5, // Add gentle horizontal movement
            rotation: heart.rotation + 0.2 * deltaTime,
            opacity: newOpacity
          };
        }).filter(Boolean) as Heart[]; // Remove null items

        return updatedHearts;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    if (hearts.length > 0) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hearts.length, isFadingOut]);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            transform: `rotate(${heart.rotation}deg)`,
            opacity: heart.opacity,
            transition: "opacity 300ms ease-out"
          }}
        >
          <Heart
            className="fill-pink-500 text-pink-500"
            style={{
              width: `${heart.size}px`,
              height: `${heart.size}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}




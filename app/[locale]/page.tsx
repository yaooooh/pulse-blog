// components/AnimatedHero.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    var tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
    tl.from(heroRef.current, { y: -80, duration: 1, opacity: 0.5, ease: 'sine.out' });
    tl.to(heroRef.current, { y: 50, duration: 1, opacity: 1, ease: 'sine.out' });
    tl.to(heroRef.current, { y: -80, duration: 1, opacity: 0.5, ease: 'sine.in' });
  })

  return (
    <div ref={heroRef} className="h-full flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <h1 className="text-6xl font-bold">Welcome to My Animated Page</h1>
    </div>
  );
}

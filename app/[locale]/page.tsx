// components/AnimatedHero.tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // useEffect(() => {
  //   const tl = gsap.timeline({ repeat: 2, repeatDelay: 1 });
  //   tl.from(heroRef.current, { y: -80, duration: 1, opacity: 0.5, ease: 'sine.out' });
  //   tl.to(heroRef.current, { y: 50, duration: 1, opacity: 1, ease: 'sine.out' });
  //   tl.to(heroRef.current, { y: -80, duration: 1, opacity: 0.5, ease: 'sine.in' });
  // })

  useEffect(() => {
    setTimeout(() => {
      router.push('/home');
    }, 1500);
  })

  return (
    <div ref={heroRef} className="h-full flex items-center justify-center bg-white text-black dark:bg-black dark:text-white">
      <FontAwesomeIcon
        icon={faPaw}
        size="6x"
        className="text-amber-400 mb-4"
        bounce
      />
    </div>
  );
}

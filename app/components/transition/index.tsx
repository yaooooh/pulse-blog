// components/Transition.tsx
"use client";
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Breadcrumb } from 'antd';
import Link from 'next/link';

export default function Transition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routes = useSelector((state: RootState) => state?.router?.route);
  const [displayChildren] = useState(children);
  const [prePath, setPrePath] = useState<string>(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  console.log(pathname)

  useEffect(() => {
    let preIndex = 0, currIndex = 0;

    routes.forEach((route, index) => {
      if (route.href.startsWith(prePath)) {
        preIndex = index;
      }
      if (route.href.startsWith(pathname)) {
        currIndex = index;
      }
    })
    const isPositive = preIndex === currIndex ? 0 : preIndex > currIndex ? -1 : 1;

    gsap.fromTo(containerRef.current, { x: isPositive * 100, opacity: 0 }, { x: 0, opacity: 1 })
    setPrePath(pathname);
  }, [pathname]);
  return <div className='h-full' ref={containerRef}>
    {
      !pathname.endsWith('home') && <div className='ms-5'>
        <Breadcrumb
          items={
            pathname.replace('/en', '/Home')
              .split('/').slice(1, -1)
              .map(item => ({
                title: <Link href={`/${item.toLowerCase()}`}>{item.toLocaleUpperCase()}</Link>
              }))}
        />
      </div>
    }
    {displayChildren}
  </div>;
}

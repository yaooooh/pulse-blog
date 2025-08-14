'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button, Dropdown } from 'antd';
import { useTheme } from 'next-themes';
import { useTranslation } from '../../../hooks/useTranslation';
import { faBars, faMoon, faPaw, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/index';
import classNames from 'classnames';
import gsap from 'gsap';
import { setLocale } from '../../../store/locale.slice';


export default function Navbar() {
  const menuLinks = useSelector((state: RootState) => state?.router?.route);
  const locale = useSelector((state: RootState) => state?.locale?.locale);
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const toggleDotRef = useRef(null);
  const toggleIconRef = useRef(null);

  const { t } = useTranslation();

  const switchLocale = () => {
    const next = locale === 'en' ? 'zh' : 'en';
    dispatch(setLocale(next));
    document.cookie = `NEXT_LOCALE=${next}`;
    const tail = pathname.split(`/${locale}`)[1] || '/';
    router.push(`/${next}${tail}`, { scroll: false });
  };

  useEffect(() => {
    gsap.to(toggleDotRef.current, {
      x: !(theme === 'dark') ? -23 : 0, // 滑块移动
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(toggleIconRef.current, {
      x: !(theme === 'dark') ? 23 : 0,
      duration: 0.3,
      ease: 'power2.out'
    })
  }, [theme])

  const Toggle = (
    <div
      className={classNames(
        'w-12 h-6 rounded-full flex items-center justify-between px-1 cursor-pointer transition-colors duration-300',
        theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-300'
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <FontAwesomeIcon ref={toggleIconRef} icon={theme === 'dark' ? faSun : faMoon} className={theme === 'dark' ? 'text-yellow-300' : 'text-white'} />
      <div
        ref={toggleDotRef}
        className="w-4 h-4 bg-white rounded-full shadow-md transform"
      />
    </div>
  )

  const Language = (
    <Button size='small' type='link' onClick={() => switchLocale()}>
      {locale === 'en' ? '中文' : 'EN'}
    </Button>
  )

  return (
    <nav className="shadow sticky top-0 z-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            <Link href="/" scroll={false}><FontAwesomeIcon icon={faPaw} className='text-[#FFD43B]' /></Link>
          </div>

          <div className="hidden lg:flex space-x-8">
            {menuLinks.map((item) => (
              <Link className={classNames('hover:text-blue-500', { 'text-blue-600': pathname.endsWith(item.href) })} key={item.key} href={item.href}>
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          <div className='hidden lg:flex items-center gap-2.5'>
            {Toggle}
            {Language}
          </div>

          <div className="lg:hidden">
            <Dropdown menu={{
              items: menuLinks.map(item => ({
                key: t(`nav.${item.key}`),
                label: <Link href={item.href}>{t(`nav.${item.key}`)}</Link>,
              })).concat(
                {
                  key: 'language', label: Language
                },
                {
                  key: 'theme', label: Toggle
                }
              )
            }}>
              <FontAwesomeIcon icon={faBars} />
            </Dropdown>
          </div>
        </div>
      </div>
    </nav >
  );
}

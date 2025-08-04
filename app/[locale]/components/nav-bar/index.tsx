'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Drawer, Button, Menu, Switch, Space } from 'antd';
import { useTheme } from 'next-themes';
import { useTranslation } from '../../../../hooks/useTranslation';
import { faBars, faMoon, faPaw, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/index';


export default function Navbar() {
  const locale = useSelector((state: RootState) => state?.locale?.locale);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuLinks = [
    { key: 'home', href: '/' },
    { key: 'article', href: '/en/article' },
    { key: 'profile', href: '/en/profile' },
    { key: 'contact', href: '/en/contact' },
  ];

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  const switchLocale = () => {
    const next = locale === 'en' ? 'zh' : 'en';
    const tail = pathname.split(`/${locale}`)[1] || '/';
    router.push(`/${next}${tail}`, { scroll: false });
    document.cookie = `NEXT_LOCALE=${next}`;
  };

  return (
    <nav className="shadow sticky top-0 z-20 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-xl">
            <Link href="/" scroll={false}><FontAwesomeIcon icon={faPaw} onClick={() => setDrawerOpen(true)} className='text-[#FFD43B]' /></Link>
          </div>

          <div className="hidden lg:flex space-x-8">
            {menuLinks.map((item) => (
              <Link className="hover:text-blue-500" key={item.key} href={item.href}>
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>

          <div className='hidden lg:flex items-center gap-2.5'>
            <span onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {
                theme === 'dark' ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />
              }
            </span>
            <Button
              size="small"
              type="link"
              onClick={() => switchLocale()}
            >
              {locale === 'en' ? '中文' : 'EN'}
            </Button>
          </div>


          <div className="lg:hidden">
            <FontAwesomeIcon icon={faBars} onClick={() => setDrawerOpen(true)} />
          </div>
        </div>
      </div>

      <Drawer
        title="Menu"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={260}
      >
        <Menu
          mode="inline"
          items={menuLinks.map((item) => ({
            key: item.key,
            label: <Link href={item.href}>{t(`nav.${item.key}`)}</Link>,
          }))}
        />

        <Space size="large" className="mt-4 px-2">
          <span>{t('common.theme')}</span>
          <Switch checked={theme === 'dark'} onChange={toggleTheme} />
        </Space>

        <div className="mt-4 px-2">
          <Button type="default" onClick={switchLocale} block>
            {t('common.language')}: {locale === 'en' ? '中文' : 'EN'}
          </Button>
        </div>
      </Drawer>
    </nav>
  );
}

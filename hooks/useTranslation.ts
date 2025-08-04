'use client';
import zh from '../locales/zh.json';
import en from '../locales/en.json';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


export function useTranslation() {
  const locale = useSelector((state: RootState) => state?.locale?.locale);
  const dict = locale === 'en' ? en : zh;

  return (key: string): string => {
    const parts = key.split('.');
    // 深层查找
    return parts.reduce((o: any, k: string) => o?.[k], dict) ?? key;
  };
}

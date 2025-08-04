'use client';
import zh from '../locales/zh.json';
import en from '../locales/en.json';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setLocale } from '../store/locale.slice';


export function useTranslation(module?: string) {
  const dispatch = useDispatch();
  const locale = useSelector((state: RootState) => state?.locale?.locale);
  const dict = locale === 'en' ? en : zh;

  return {
    locale,
    setLocale: (locale: 'en' | 'zh') => dispatch(setLocale(locale)),
    t: (key: string): string => {
      const parts = key.split('.');
      // 深层查找
      return parts.reduce((o: any, k: string) => o?.[k], module ? dict?.[module as keyof typeof dict] : dict) ?? key;
    }
  };
}

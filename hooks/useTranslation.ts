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
    t: <T extends { [key: string]: string}>(key: string, args?: T): string => {
      const parts = key.split('.');
      // 深层查找
      let val: string = parts.reduce((o: any, k: string) => o?.[k], module ? dict?.[module as keyof typeof dict] : dict) ?? key;
      if (args) {
        Object.keys(args).forEach(key => {
          val = val.replaceAll(`{${key}}`, args[key]);
        })
      }
      return val;
    }
  };
}

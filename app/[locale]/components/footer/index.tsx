'use client';
import { useTranslation } from "../../../../hooks/useTranslation";

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} {t('siteTitle')}
    </footer>
  )
};

export default Footer;

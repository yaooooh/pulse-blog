'use client';
import React from 'react';
import Link from 'next/link';
import { Button, Card, Space, Divider } from 'antd';
import { AliwangwangFilled, FileTextOutlined, UploadOutlined, CommentOutlined, MessageOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation('common');

  const mounted = React.useRef(false);
  React.useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <main className="px-4 py-8 max-w-4xl mx-auto space-y-8">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card bordered={false}>
          <h2 className="text-2xl font-semibold">{t('heroTitle')}</h2>
          <p className="mt-2">{t('heroSubtitle')}</p>
        </Card>

        <Divider className="dark:border-gray-700">{t('features')}</Divider>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featureItems.map((item) => (
            <Card
              key={item.key}
              hoverable
              bordered={false}
              className="bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-transform"
              bodyStyle={{ padding: '20px' }}
            >
              <Space align="start">
                <item.icon style={{ fontSize: '1.8rem', color: 'inherit' }} />
                <div>
                  <h3 className="text-lg font-medium">{t(item.titleKey)}</h3>
                  <p className="mt-1">{t(item.descKey)}</p>
                  <Link href={item.href}>
                    <Button type="link">{t('learnMore')} →</Button>
                  </Link>
                </div>
              </Space>
            </Card>
          ))}
        </div>
      </Space>
    </main>
  );
}

// 功能板块清单
const featureItems = [
  {
    key: 'knowledge',
    icon: AliwangwangFilled,
    titleKey: 'knowledge',
    descKey: 'knowledgeDesc',
    href: '/knowledge'
  },
  {
    key: 'articles',
    icon: FileTextOutlined,
    titleKey: 'articles',
    descKey: 'articlesDesc',
    href: '/articles'
  },
  {
    key: 'files',
    icon: UploadOutlined,
    titleKey: 'files',
    descKey: 'filesDesc',
    href: '/upload'
  },
  {
    key: 'comments',
    icon: CommentOutlined,
    titleKey: 'comments',
    descKey: 'commentsDesc',
    href: '/comments'
  },
  {
    key: 'chat',
    icon: MessageOutlined,
    titleKey: 'chat',
    descKey: 'chatDesc',
    href: '/chat'
  }
];

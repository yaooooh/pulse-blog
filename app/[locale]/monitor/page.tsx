// components/Profile.tsx
'use client';
import React from 'react';
import { Card, List, Avatar, Button } from 'antd';
import { Line } from '@ant-design/charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../hooks/useTranslation';

type Article = { id: string; title: string; description: string; url: string };
type StatsPoint = { date: string; value: number };

interface Props {
  avatarSrc: string;
  name: string;
  title: string;
  bio: string;
  articles: Article[];
  stats: StatsPoint[];
}

export default function Profile({
  avatarSrc,
  name,
  title,
  bio,
  articles,
  stats = [
    { date: '2025-07-28', value: 10 },
    { date: '2025-07-29', value: 15 },
    { date: '2025-07-30', value: 12 },
    // 更多数据点
  ],
}: Props) {
  const chartConfig = {
    data: stats,
    xField: 'date',
    yField: 'value',
    smooth: true,
    height: 240,
    padding: 'auto',
  };
  const { t } = useTranslation('profile');

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-3">
      {/* Hero & 个人简介 */}
      <section className="text-center space-y-4">
        {/* <Avatar size={120} src={avatarSrc} className="mx-auto" /> */}
        <FontAwesomeIcon icon={faPaw} size='5x' />
        <h1 className="text-4xl font-semibold">{name}</h1>
        <p className="text-lg text-gray-600">{title}</p>
        <p className="mt-4 text-gray-700">{bio}</p>
      </section>

      {/* 推荐文章 */}
      <section id="articles">
        <h2 className="text-2xl font-medium mb-4">{t('recommend')}</h2>
        <Card>
          <List<Article>
            grid={{ gutter: 16, column: 1, xs: 1, sm: 1, md: 2 }}
            dataSource={articles}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  className="w-full"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                </Card>
              </List.Item>
            )}
          />
        </Card>
      </section>

      {/* 活跃图表 */}
      <section id="stats">
        <h2 className="text-2xl font-medium mb-4">{t('activeChart')}</h2>
        <Card>
          <div className="h-60">
            <Line {...chartConfig} />
          </div>
        </Card>
      </section>

      {/* 联系 CTA */}
      <section id="contact" className="text-center">
        <Button type="primary" shape="round" size="large">
          {t('concat')}
        </Button>
      </section>
    </div>
  );
}

'use client';
import React, { useState, useMemo } from 'react';
import { Input, List, Card, Tooltip, FloatButton } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { articlesMock } from '../../../data/article.mock'; // 可以换成真实 API
import { useTranslation } from '../../../hooks/useTranslation';

const { Search } = Input;

export default function ArticleListPage() {
  const { t } = useTranslation('article');
  const { resolvedTheme } = useTheme();

  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);

  const data = articlesMock; // 实际应用可换成 fetch 后端数据
  const filtered = useMemo(() => {
    if (!filter) return data;
    const f = filter.trim().toLowerCase();
    return data.filter(
      (a) =>
        a.title.toLowerCase().includes(f) ||
        a.description.toLowerCase().includes(f)
    );
  }, [filter, data]);

  return (
    <div
      className={`h-210 px-6 py-8 transition-colors duration-300 ${resolvedTheme === 'dark'
        ? 'bg-black text-gray-100'
        : 'bg-white text-gray-900'
        }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('articlesTitle')}
      </h1>

      <div className="max-w-lg mx-auto mb-6">
        <Search
          placeholder={t('searchPlaceholder')}
          allowClear
          enterButton
          size="large"
          onSearch={setFilter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <List
        rowKey="id"
        grid={{
          gutter: 24,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 4,
          xxl: 6,
        }}
        pagination={{
          current: currentPage,
          pageSize: 8,
          total: filtered.length,
          onChange: (page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
          showSizeChanger: false,
          showTotal: (total) => `${total} ${t('articlesCount')}`,
        }}
        dataSource={filtered}
        locale={{
          emptyText: t('noData'),
        }}
        renderItem={(item) => (
          <List.Item>
            <Link href={`/en/article/${item.id}`} passHref>
              <Card
                hoverable
                className={`h-60 flex flex-col justify-between transition-shadow duration-300 ${resolvedTheme === 'dark'
                  ? 'bg-gray-800 hover:shadow-2xl'
                  : 'bg-white hover:shadow-lg'
                  }`}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {item.date}
                </div>
              </Card>
            </Link>
          </List.Item>
        )}
      />

      <FloatButton.Group
        icon={<EditOutlined />}
        type="primary"
        style={{ right: 24, bottom: 64 }}
        trigger="click"
      >
        <Tooltip title={t('upload')}>
          <FloatButton
            icon={<UploadOutlined />}
            onClick={() => {
              /* 跳转上传页 */
              window.location.href = '/upload';
            }}
          />
        </Tooltip>
        <Tooltip title={t('publish')}>
          <FloatButton
            icon={<EditOutlined />}
            onClick={() => {
              /* 跳转发布文章页 */
              window.location.href = '/articles/new';
            }}
          />
        </Tooltip>
      </FloatButton.Group>
    </div>
  );
}

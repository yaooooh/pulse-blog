'use client';
import { useState } from 'react';
import { Input, Tag, Card } from 'antd';
import { useTranslation } from '../../../hooks/useTranslation';

const dummyArticles = [
  { id: 1, title: 'How to Use Next.js', tags: ['Next.js', 'React'], type: 'Tutorial' },
  { id: 2, title: 'Understanding Dark Mode', tags: ['Design', 'UI'], type: 'Design' },
  { id: 3, title: '构建博客系统', tags: ['Next.js'], type: '开发' },
];


import { Checkbox, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Article() {
  const { t } = useTranslation('article');
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filtered = dummyArticles.filter(a =>
    (!search || a.title.toLowerCase().includes(search.toLowerCase())) &&
    (!selectedTag || a.tags.includes(selectedTag)) &&
    (!selectedType || a.type === selectedType)
  );

  const searchArticle = () => {
    console.log(search)
  }

  const articles = [
    { title: '构建你的第一个 Next.js 博客', tags: ['Next.js', 'React'] },
    { title: 'Tailwind CSS 响应式布局指南', tags: ['Tailwind', 'CSS'] },
    { title: 'UI 设计中的深色模式实践', tags: ['Design', 'UX'] },
  ];

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-6">
        <Input
          value={search}
          onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
          suffix={<FontAwesomeIcon onClick={searchArticle} icon={faSearch} />} />
        <div className="flex flex-col lg:flex-row gap-4">

          {/* 左侧筛选栏 */}
          <aside className="lg:w-1/5">
            <div className="bg-white dark:bg-black p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{t('title')}</h3>
              <Divider className="my-2" />
              <Checkbox.Group className="flex flex-col gap-2">
                <Checkbox value="react">{t('react')}</Checkbox>
                <Checkbox value="next">{t('next')}</Checkbox>
                <Checkbox value="tailwind">{t('tailwind')}</Checkbox>
                <Checkbox value="design">{t('design')}</Checkbox>
              </Checkbox.Group>
            </div>
          </aside>

          {/* 文章列表 */}
          <main className="lg:w-3/5 w-full">
            <div className="space-y-4">
              {articles.map((a, i) => (
                <Card key={i} className="dark:bg-black dark:text-white">
                  <h2 className="text-xl font-semibold">{a.title}</h2>
                  <div className="mt-2">
                    {a.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </main>

          {/* 右侧推荐 */}
          <aside className="lg:w-1/5 hidden lg:block">
            <div className="bg-white dark:bg-black p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">🔥 推荐内容</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-600 dark:text-blue-400">构建一个个人博客</a></li>
                <li><a href="#" className="text-blue-600 dark:text-blue-400">使用 Ant Design 的最佳实践</a></li>
                <li><a href="#" className="text-blue-600 dark:text-blue-400">前端面试常见问题</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

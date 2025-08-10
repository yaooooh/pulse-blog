'use client';
import { useEffect, useState } from 'react';
import { Input, Tag, Card, Flex, Typography } from 'antd';
import { useTranslation } from '../../../hooks/useTranslation';

const { Paragraph } = Typography;

const dummyArticles = [
  { id: 1, title: 'How to Use Next.js', tags: ['Next.js', 'React'], type: 'Tutorial' },
  { id: 2, title: 'Understanding Dark Mode', tags: ['Design', 'UI'], type: 'Design' },
  { id: 3, title: '构建博客系统', tags: ['Next.js'], type: '开发' },
];


import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ArticleType, getArticleList } from '../../../request/article.request';
import Link from 'next/link';
import { getTagList, TagType } from '../../../request/tag.request';

export default function Article() {
  const { t } = useTranslation('article');
  const [search, setSearch] = useState('');
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [tagList, setTagList] = useState<TagType[]>([]);

  useEffect(() => {
    getArticleList().then(res => {
      setArticleList(res.data);
    })
    getTagList().then(res => {
      setTagList(res.data);
    })
  }, [])

  const searchArticle = () => {
    console.log(search)
  }

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* 左侧筛选栏 */}
          <aside className="lg:w-1/5 hidden lg:block">
            <div className="bg-white dark:bg-black p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{t('title')}</h3>
              <Checkbox.Group className="flex flex-col gap-2">
                {
                  tagList.map(tag => <Checkbox value={tag} key={tag}>{t(tag)}</Checkbox>)
                }
              </Checkbox.Group>
            </div>
          </aside>

          {/* 文章列表 */}
          <main className="lg:w-3/5 w-full">
            <Input
              className='mb-6'
              value={search}
              onInput={(e) => setSearch((e.target as HTMLInputElement).value)}
              suffix={<FontAwesomeIcon onClick={searchArticle} icon={faSearch} />} />
            <Flex gap={10} vertical className="space-y-4">
              {articleList.map((a, i) => (
                <Card key={a.id} className="dark:bg-black dark:text-white">
                  <h2 className="text-xl font-semibold"><Link href={`article/${a.id}`}>{a.title}</Link></h2>
                  <Paragraph ellipsis={{ rows: 3, expandable: false, symbol: 'more' }}>{a.content}</Paragraph>
                  <div className="mt-2">
                    {a.tags.map(tag => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </Card>
              ))}
            </Flex>
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

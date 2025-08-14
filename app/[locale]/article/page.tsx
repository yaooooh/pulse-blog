'use client';
import { useEffect, useState } from 'react';
import { Input, Tag, Card, Flex, Typography } from 'antd';

import Link from 'next/link';
import { Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { getTagList, TagType } from '../../../request/tag.request';
import { ArticleType, getArticleList } from '../../../request/article.request';

const { Paragraph } = Typography;

export default function Article() {
  const { t } = useTranslation('article');
  const [search, setSearch] = useState('');
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [tagList, setTagList] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const getData = (params?: Partial<ArticleType>) => {
    getArticleList(params).then(res => {
      setArticleList(res.data);
    })
  }

  useEffect(() => {
    getData();
    getTagList().then(res => {
      setTagList(res.data);
    })
  }, [])

  useEffect(() => {
    if (selectedTags.length === 0) {
      getData();
    }
    setArticleList(articleList.filter(article =>
      selectedTags.length === 0 ||
      selectedTags.some(tag => article.tags.includes(tag.toUpperCase()))
    ))
  }, [selectedTags])

  const searchArticle = () => {
    const val = search.trim();
    if (val.length === 0) {
      // message.error('Please input the search text.');
      // return;
      getData();
    }
    setArticleList(articleList.filter(article => article.title.toLowerCase().includes(val.toLowerCase())));
    // getData({ title: val })
  }

  return (
    <div className="bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* 左侧筛选栏 */}
          <aside className="lg:w-1/5 hidden lg:block">
            <div className="bg-white dark:bg-black p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{t('title')}</h3>
              <Checkbox.Group className="flex flex-col gap-2" value={selectedTags} onChange={setSelectedTags}>
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
              suffix={<FontAwesomeIcon onClick={searchArticle} icon={faSearch} className='cursor-pointer' />} />
            <Flex gap={10} vertical className="space-y-4">
              {articleList.map((a, i) => (
                <Card key={a.id} className="dark:bg-black dark:text-white">
                  <h2 className="text-xl font-semibold"><Link href={`article/${a.id}`}>{a.title}</Link></h2>
                  <Paragraph ellipsis={{ rows: 3, expandable: false, symbol: 'more' }}>{a.description}</Paragraph>
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
                {
                  articleList.slice(0, 3).map(article => (
                    <>
                      <li><a href={`article/${article.id}`} className='text-blue-600 dark:text-blue-400'>{article.title}</a></li>
                    </>
                  ))
                }
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

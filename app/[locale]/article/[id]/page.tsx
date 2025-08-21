'use client'

import React, { useEffect, useState } from 'react';
import { Card, Empty, Tag } from 'antd';
import { useTheme } from 'next-themes';
import { Marked } from 'marked';
import Link from 'next/link';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import { useTranslation } from '../../../../hooks/useTranslation';
import { ArticleType, getArticleById } from '../../../../request/article.request';
import { format } from '../../../../utils/date.util';
import Request from '../../../../request/request';

const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const request = new Request();

const ArticleDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { locale } = useTranslation('article-info')
  const { theme } = useTheme()
  const [article, setArticle] = useState<ArticleType | null>(null);
  const id = React.use(params).id; // 修复获取 ID 的方式

  useEffect(() => {
    if (theme === 'dark') import('highlight.js/styles/github-dark.min.css');
    else import('highlight.js/styles/github.min.css')
  }, [theme])

  useEffect(() => {
    // getArticleById(id).then(res => {
    //   setArticle(res.data)
    // })
    // vercel environment can't access the code directory
    request.get<ArticleType>(`/static/articles/${id}`).then(res => {
      console.log(res)
      setArticle({
        author: 'DH',
        id: '123',
        content: res,
        description: '',
        title: ''
      })
    })
  }, [id])

  if (!article) {
    return <Empty className="mt-10" />;
  }

  return (
    <div className='px-4 md:px-6 py-6 md:py-8 transition-colors duration-300 bg-white text-gray-900 dark:bg-black dark:text-gray-100'>
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <Card className="!p-4 md:!p-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">{article?.title}</h1>
          <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mb-3 flex flex-wrap gap-x-2">
            <Link href={`/${locale}/user/${article.author}`} className="hover:underline">{article.author}</Link>
            <span>|</span>
            <span>{format(article.createTime, 'YYYY-MM-dd HH:mm:ss')}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {article.tags?.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Card>

        <Card className="!p-4 md:!p-6 overflow-x-auto">
          <div
            className="prose prose-sm md:prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: marked.parse(article.content || '') }}
          />
        </Card>
      </div>
    </div>
  )
}

export default ArticleDetailPage

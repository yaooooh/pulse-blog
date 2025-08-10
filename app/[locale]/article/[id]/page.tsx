'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { List, Button, Avatar, Space, Card, message, Empty, Tag } from 'antd'
import { LikeOutlined, DislikeOutlined, SendOutlined } from '@ant-design/icons'
import { useTheme } from 'next-themes'
import { Marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';
import { useTranslation } from '../../../../hooks/useTranslation'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { ArticleType, getArticleById } from '../../../../request/article.request'
import { format } from '../../../../utils/date.util'


const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const ArticleDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { locale, t } = useTranslation('article-info')
  const { theme } = useTheme()
  const router = useRouter()
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState<ArticleType | null>(null);
  const id = React.use(params).id

  useEffect(() => {
    if (theme === 'dark') import('highlight.js/styles/github-dark.min.css');
    else import('highlight.js/styles/github.min.css')
  }, [theme])

  useEffect(() => {
    getArticleById(id).then(res => {
      setArticle(res.data)
      console.log(res)
    })
  }, [])

  if (!article) {
    return <Empty />;
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      message.warning(t('commentEmpty'))
      return
    }
    setLoading(true)
  }

  const handleLike = (commentId: string) => {
    setComments(comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ))
  }

  const handleDislike = (commentId: string) => {
    setComments(comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes - 1 }
        : comment
    ))
  }

  return (
    <div className='px-6 py-8 transition-colors duration-300 bg-white text-gray-900 dark:bg-black dark:text-gray-10 relative'>
      {/* 返回按钮 */}
      {/* <div onClick={() => router.push(`/${locale}/article`)} className='fixed top-25 left-25 text-blue-500 inline'>
        <FontAwesomeIcon icon={faArrowLeft} size='lg' />
      </div> */}

      <div className="max-w-3xl mx-auto mb-8 flex flex-col gap-2">
        {/* 文章基本信息 */}
        <Card className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{article?.title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href={`${locale}/user/${article.author}`}>{article.author}</Link> | <span>{format(article.createTime, 'YYYY-MM-dd HH:mm:ss')}</span>
          </div>
          <div className="mt-2">
            {article.tags?.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          {/* <p className="text-lg">{article.description}</p> */}
        </Card>

        <Card>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(article.content || '') }}></div>
        </Card>

        {/* 评论区 */}
        <div className="mb-8 flex flex-col gap-5">
          <h2 className="text-2xl font-semibold mb-4">{t('comments')}</h2>

          {/* 评论输入框 */}
          {/* <TextArea
            rows={4}
            placeholder={t('commentPlaceholder')}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4"
          /> */}

          <Button
            type="primary"
            onClick={handleCommentSubmit}
            icon={<SendOutlined />}
            loading={loading}
            disabled={loading}
          >
            {t('submitComment')}
          </Button>
        </div>

        {/* 评论列表 */}
        {
          comments.length > 0 && <List
            className="comment-list"
            header={`${comments.length} ${t('comments')}`}
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(comment) => (
              <li className='mb-5'>
                <Card className="mb-4 p-4">
                  <div className="flex items-center mb-2 gap-2 justify-between">
                    <Avatar src={comment.user.avatar} alt={comment.user.name} className="mr-3" />
                    <div className='flex-1'>
                      <div className="font-semibold">{comment.user.name}</div>
                      <div className="text-sm text-gray-500 text-right">{new Date(comment.date).toLocaleString()}</div>
                    </div>
                  </div>
                  <p>{comment.content}</p>
                  <div className="flex items-center mt-2">
                    <Space>
                      <span onClick={() => handleLike(comment.id)} className="cursor-pointer">
                        <LikeOutlined /> {comment.likes}
                      </span>
                      <span onClick={() => handleDislike(comment.id)} className="cursor-pointer">
                        <DislikeOutlined /> {comment.likes < 0 ? 0 : comment.likes}
                      </span>
                    </Space>
                  </div>
                </Card>
              </li>
            )}
          />
        }
      </div>
    </div>
  )
}

export default ArticleDetailPage

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { List, Input, Button, Avatar, Space, Card, message } from 'antd'
import { LikeOutlined, DislikeOutlined, SendOutlined } from '@ant-design/icons'
import { useTheme } from 'next-themes'
import { useTranslation } from '../../../../hooks/useTranslation'
import { Article, articlesMock } from '../../../../data/article.mock'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const { TextArea } = Input

const ArticleDetailPage = ({ params }: { params: { id: string } }) => {
  const { locale, t } = useTranslation('article-info')
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  // 获取文章详情
  const article = articlesMock.find((a: Article) => a.id === params.id)

  if (!article) {
    return <div>{t('noData')}</div>
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim()) {
      message.warning(t('commentEmpty'))
      return
    }
    setLoading(true)
    setTimeout(() => {
      setComments([
        ...comments,
        {
          id: Math.random().toString(36).substr(2, 9), // 随机生成一个 id
          content: newComment,
          likes: 0,
          user: { name: 'Anonymous', avatar: 'https://joeschmoe.io/api/v1/random' },
          date: new Date().toISOString(),
        },
      ])
      setNewComment('')
      setLoading(false)
    }, 500)
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
    <div className={`min-h-screen px-6 py-8 transition-colors duration-300 bg-white text-gray-900 dark:bg-black dark:text-gray-10 relative`}>
      {/* 返回按钮 */}
      <div onClick={() => router.push(`/${locale}/article`)} className='fixed top-25 left-25 text-blue-500 inline'>
        <FontAwesomeIcon icon={faArrowLeft} size='lg' />
      </div>

      <div className="max-w-3xl mx-auto mb-8 flex flex-col gap-2">
        {/* 文章基本信息 */}
        <Card className="mb-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href={`${locale}/user/${article.author}`}>{article.author}</Link> | <span>{article.date}</span>
          </div>
          <p className="text-lg">{article.description}</p>
        </Card>

        <Card>
          {article.content}
        </Card>

        {/* 评论区 */}
        <div className="mb-8 flex flex-col gap-5">
          <h2 className="text-2xl font-semibold mb-4">{t('comments')}</h2>

          {/* 评论输入框 */}
          <TextArea
            rows={4}
            placeholder={t('commentPlaceholder')}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-4"
          />

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

export async function getStaticPaths() {
  const paths = articlesMock.map((article: Article) => ({
    params: { id: article.id }
  }))

  return {
    paths,
    fallback: false,
  }
}

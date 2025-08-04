'use client'

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

import { Card, Avatar, Space, Button, Statistic, Row, Col } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { useTranslation } from '../../../hooks/useTranslation'

interface Article {
  id: string
  title: { zh: string; en: string }
  description?: { zh: string; en: string }
}

export default function DashboardPage() {
  const { t } = useTranslation('profile')
  const { resolvedTheme } = useTheme()

  // 从 Redux 获取用户资料（示例结构）
  const user = useSelector((s: RootState) => s?.user?.profile)
  const stats = useSelector((s: RootState) => s?.user?.stats)
  const recs = useSelector((s: RootState) => s?.user?.recommendedArticles)

  const [recommended, setRecommended] = useState<Article[]>(recs)

  const locale = (t as any).i18n?.language || 'en'

  function swap(arr: Article[], i: number, j: number) {
    const a = [...arr]
      ;[a[i], a[j]] = [a[j], a[i]]
    return a
  }

  const moveUp = (idx: number) => {
    if (idx === 0) return
    setRecommended(swap(recommended, idx, idx - 1))
  }

  const moveDown = (idx: number) => {
    if (idx === recommended.length - 1) return
    setRecommended(swap(recommended, idx, idx + 1))
  }

  /* 可选：如果你想实现真正的拖拽排序，
  可以集成 react-beautiful-dnd 或 dnd-kit 到 Ant Design List；
  例如这里的指南展示了如何将 react‑beautiful‑dnd 集成到 AntD 的 List 中，来实现拖拽排序：:contentReference[oaicite:6]{index=6} */

  return (
    <div
      className={`min-h-screen p-6 space-y-6 transition-colors duration-300 ${resolvedTheme === 'dark'
        ? 'bg-black text-gray-100'
        : 'bg-white text-gray-900'
        }`}
    >
      {/* 用户资料卡片（头像 / 简介 / 编辑按钮） */}
      <Card className="max-w-xl mx-auto shadow-md">
        <div className="flex items-center space-x-4">
          <Avatar size={64} src={user?.avatar} />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{user?.bio}</p>
          </div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => window.location.href = '/settings'}
          >
            {t('editProfile')}
          </Button>
        </div>
      </Card>

      {/* 活跃统计区 */}
      <Row gutter={[16, 16]} className="max-w-4xl mx-auto">
        <Col xs={12} sm={8}>
          <Card className="text-center shadow">
            <Statistic title={t('articlesCount')} value={stats?.articles} />
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card className="text-center shadow">
            <Statistic title={t('commentsCount')} value={stats?.comments} />
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card className="text-center shadow">
            <Statistic title={t('likesCount')} value={stats?.likes} />
          </Card>
        </Col>
      </Row>

      {/* 推荐文章列表，可上下调整位置 */}
      <div className="max-w-4xl mx-auto space-y-4">
        <h3 className="text-xl font-semibold">{t('yourRecsTitle')}</h3>
        <Space direction="vertical" style={{ width: '100%' }}>
          {recommended?.map((a, idx) => (
            <Card
              key={a.id}
              hoverable
              className={`transition-colors duration-200 ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}
              bodyStyle={{ padding: '16px' }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <Link href={`/articles/${a.id}`}>
                    <a className="text-lg font-medium hover:text-blue-600 hover:underline">
                      {a?.title}
                    </a>
                  </Link>
                  {a.description && (
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {a?.description?.slice(0, 80)}…
                    </p>
                  )}
                </div>
                <Space direction="vertical" size="small">
                  <Button
                    size="small"
                    icon={<ArrowUpOutlined />}
                    disabled={idx === 0}
                    onClick={() => moveUp(idx)}
                  />
                  <Button
                    size="small"
                    icon={<ArrowDownOutlined />}
                    disabled={idx === recommended.length - 1}
                    onClick={() => moveDown(idx)}
                  />
                </Space>
              </div>
            </Card>
          ))}
        </Space>
      </div>
    </div>
  )
}

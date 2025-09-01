'use client'

import { useState } from 'react'
import { Input, Button, Form, message } from 'antd'
import { PhoneOutlined, MailOutlined, GlobalOutlined } from '@ant-design/icons'
// import { useTheme } from 'next-themes'
import { useTranslation } from '../../../hooks/useTranslation'
import Link from 'next/link'

export default function ContactPage() {
  const { t } = useTranslation('contact')

  const [loading, setLoading] = useState(false)

  // 表单提交处理
  const handleSubmit = async () => {
    setLoading(true)
    setTimeout(() => {
      message.success(t('contactSuccess'))
      setLoading(false)
    }, 1000)
  }

  return (
    <div className={`px-6 py-8 transition-colors duration-300 dark:bg-black dark:text-gray-100 bg-white text-gray-900`}>
      <div className="max-w-4xl mx-auto">
        {/* 联系方式部分 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('contactTitle')}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-300">{t('contactDescription')}</p>
        </div>

        {/* 联系方式 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div className="flex items-center gap-4">
            <PhoneOutlined className="text-2xl text-blue-500" />
            <div>
              <div className="font-semibold">{t('contactPhone')}</div>
              <Link className="text-sm text-gray-500 dark:text-gray-400" href='tel:+123 456 7890'>+123 456 7890</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MailOutlined className="text-2xl text-blue-500" />
            <div>
              <div className="font-semibold">{t('contactEmail')}</div>
              <Link className="text-sm text-gray-500 dark:text-gray-400" href='mailto:pulse.heay@outlook.com'>pulse.heay@outlook.com</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GlobalOutlined className="text-2xl text-blue-500" />
            <div>
              <div className="font-semibold">{t('contactWebsite')}</div>
              <Link className="text-sm text-gray-500 dark:text-gray-400" href='https://www.pulse.com'>www.pulse.com</Link>
            </div>
          </div>
        </div>

        {/* 联系表单 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">{t('contactFormTitle')}</h2>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label={t('name')} name="name" rules={[{ required: true, message: t('nameRequired') }]}>
              <Input placeholder={t('namePlaceholder')} />
            </Form.Item>
            <Form.Item label={t('email')} name="email" rules={[{ required: true, type: 'email', message: t('emailRequired') }]}>
              <Input placeholder={t('emailPlaceholder')} />
            </Form.Item>
            <Form.Item label={t('message')} name="message" rules={[{ required: true, message: t('messageRequired') }]}>
              <Input.TextArea placeholder={t('messagePlaceholder')} rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {t('sendMessage')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div >
  )
}

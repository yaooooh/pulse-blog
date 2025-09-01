'use client'

import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { FormProps, useForm } from 'antd/es/form/Form';
import { ArticleType } from '../../../request/article.request';
import MarkdownEditor from '../../components/md-editor';

const { TextArea } = Input;

export default function CreatePost() {
  const { t } = useTranslation('publish');
  const tags = useSelector((state: RootState) => state.article.tags);
  const [form] = useForm();

  // const handleUpload = ({ onSuccess }: any) => {
  //   setTimeout(() => onSuccess("ok"), 1000);
  // };


  const onFinish: FormProps<ArticleType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<ArticleType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto dark:bg-black dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-6">{t('submitArticle')}</h1>
      <Form
        form={form}
        layout='vertical'
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* 标题 */}
        <Form.Item label={t('title')} name='title' rules={[{ required: true, message: t('pleaseInput', { message: t('title') }) }]}>
          <Input className="rounded-lg" />
        </Form.Item>

        {/* 描述 */}
        <Form.Item label={t('description')} name='description' rules={[{ required: true, message: t('pleaseInput', { message: t('description') }) }]}>
          <TextArea rows={3} className="rounded-lg" />
        </Form.Item>

        {/* 标签 */}
        <Form.Item label={t('tags')} name='tags' rules={[{ required: true, message: t('pleaseInput', { message: t('tags') }) }]}>
          <Select mode='tags' showSearch options={tags.map(tag => ({ key: tag, value: tag }))}></Select>
        </Form.Item>

        {/* 上传 */}
        <Form.Item>
          <Upload showUploadList={false}>
            <Button icon={<UploadOutlined />}>{t('upload')}</Button>
          </Upload>
        </Form.Item>

        {/* 内容 */}
        <Form.Item label={t('content')} name='content' rules={[{ required: true, message: t('pleaseInput', { message: t('content') }) }]}>
          <MarkdownEditor height={400} />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit' type="primary" size="large">{t('submitArticle')}</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

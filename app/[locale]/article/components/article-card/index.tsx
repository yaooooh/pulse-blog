import { Card, Tag } from 'antd';

export default function ArticleCard({ article }: { article: any }) {
  return (
    <Card
      title={article.title}
      className="bg-white dark:bg-gray-800 dark:text-white"
    >
      <div className="mb-2">
        {article.tags.map((tag: string) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300">{article.type}</div>
    </Card>
  );
}

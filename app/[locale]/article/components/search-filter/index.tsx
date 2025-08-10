import { Input, Tag } from 'antd';
import { useTranslation } from '../../../../../hooks/useTranslation';

const tagList = ['Next.js', 'React', 'Design', '开发'];
const typeList = ['Tutorial', 'Design', '开发'];

export default function SearchFilter({
  search, onSearch, selectedTag, onTagChange, selectedType, onTypeChange
}: {
  search: string;
  onSearch: (s: string) => void;
  selectedTag: string | null;
  onTagChange: (t: string | null) => void;
  selectedType: string | null;
  onTypeChange: (t: string | null) => void;
}) {
  const { t } = useTranslation('article');

  return (
    <div>
      <Input.Search
        placeholder={t('blog.search')}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full md:w-1/2"
      />
      <div className="mt-4">
        <div className="mb-2 text-gray-700 dark:text-gray-300">{t('filter_tags')}:</div>
        {tagList.map(tag => (
          <Tag
            key={tag}
            color={selectedTag === tag ? 'blue' : 'default'}
            onClick={() => onTagChange(selectedTag === tag ? null : tag)}
            className="cursor-pointer"
          >
            {tag}
          </Tag>
        ))}
      </div>

      <div className="mt-2">
        <div className="mb-2 text-gray-700 dark:text-gray-300">{t('filter_types')}:</div>
        {typeList.map(type => (
          <Tag
            key={type}
            color={selectedType === type ? 'green' : 'default'}
            onClick={() => onTypeChange(selectedType === type ? null : type)}
            className="cursor-pointer"
          >
            {type}
          </Tag>
        ))}
      </div>
    </div>
  );
}

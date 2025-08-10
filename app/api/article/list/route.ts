export const dynamic = 'force-static'
import fs from 'fs'
import { BASE_PATH } from '../config'
import path from 'path';
import { ArticleType } from '../../../../request/article.request';
 
export async function GET() {
  const files = fs.readdirSync(BASE_PATH);
  const articleList: ArticleType[] = [];

  files.map(filename => {
    const pathname = path.join(BASE_PATH, filename);
    if (fs.existsSync(pathname)) {
      const content = fs.readFileSync(pathname);
      const stats = fs.statSync(pathname);
      articleList.push({
        id: filename,
        author: 'dh',
        title: filename.slice(0, filename.lastIndexOf('.')),
        content: String(content),
        tags: ['vue', 'react'],
        createTime: stats.ctime,
        updateTime: stats.mtime,
        size: stats.size
      })
    }
  })

  return Response.json({ data: {
    code: 0,
    data: articleList,
    message: 'Get file list successfully!',
  }})
}

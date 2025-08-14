export const dynamic = 'force-static'
import fs from 'fs'
import path from 'path';
import { NextRequest } from 'next/server';
import { BASE_PATH } from '../config'
import { ArticleType } from '../../../../request/article.request';

export async function GET(request: NextRequest) {
  const files = fs.readdirSync(BASE_PATH);
  const articleList: ArticleType[] = [];
  const title = request.nextUrl.searchParams.get('title');

  files.filter(file => file.endsWith('.json')).filter(file => !title || file.includes(title)).map(filename => {
    const pathname = path.join(BASE_PATH, filename);

    try {
      if (fs.existsSync(pathname)) {
        const content = fs.readFileSync(pathname);
        articleList.push(JSON.parse(String(content)));
      }
    } catch(error) {
      return Response.json({
        code: -1,
        data: null,
        message: 'Get file list error!'
      })
    }
  })

  return Response.json({
    code: 0,
    data: articleList,
    message: 'Get file list successfully!',
  })
}

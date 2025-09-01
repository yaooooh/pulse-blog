// export const dynamic = 'force-static';
// import fs from 'fs';
// import path from 'path';
// import { BASE_PATH } from '../config';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = await params.then((res) => res.id);
  // const filePath = path.join(BASE_PATH, id);
  const BASE_URL = new URL(request.url).origin;

  try {
    const response = await fetch(`${BASE_URL}/static/articles/${id}`).then(
      (res) => res.text()
    );

    return Response.json({
      code: 0,
      data: {
        id: id,
        title: id.slice(0, id.lastIndexOf('.')),
        author: 'DH',
        filename: id,
        tags: ['vue', 'react'],
        content: response,
        createTime: 1756657292471,
        updateTime: 1756657292471,
      },
      message: 'Get article content successfully!',
    });
  } catch (err) {
    return Response.json({
      data: {
        code: 0,
        data: null,
        message: 'Get article content error!',
      },
    });
  }

  // if (!fs.existsSync(filePath)) {
  //   return Response.json({
  //     data: {
  //       code: 0,
  //       data: null,
  //       message: 'No such file',
  //     }
  //   })
  // }
  // try {
  //   const content = fs.readFileSync(filePath);
  //   const stats = fs.statSync(filePath);

  //   return Response.json({
  //     code: 0,
  //     data: {
  //       id: id,
  //       title: id.slice(0, id.lastIndexOf('.')),
  //       author: 'DH',
  //       filename: id,
  //       tags: ['vue', 'react'],
  //       content: String(content),
  //       createTime: stats.ctime,
  //       updateTime: stats.mtime,
  //       size: stats.size,
  //     },
  //       message: 'Get article content successfully!',
  //   })
  // } catch(error: unknown) {
  //   return Response.json({
  //     data: {
  //       code: 0,
  //       data: null,
  //       message: 'Get article content error!',
  //     }
  //   })
  // }
}

// import { put } from "@vercel/blob";
// export async function POST(request: NextRequest, { params }: {params: Promise<{id: string}>}) {
//   const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
// }

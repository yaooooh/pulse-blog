export const dynamic = 'force-static'
import tags from '../../../../public/static/tags/index.json'
 
export async function GET() {

  return Response.json({
    code: 0,
    data: tags,
    message: 'Get file list successfully!',
  })
}

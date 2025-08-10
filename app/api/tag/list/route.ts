export const dynamic = 'force-static'
import tags from '../../../../static/tags/index.json'
 
export async function GET() {

  return Response.json({ data: {
    code: 0,
    data: tags,
    message: 'Get file list successfully!',
  }})
}

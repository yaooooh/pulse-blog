export const dynamic = 'force-static'
import fs from 'fs'
 
export async function GET() {
  const files = fs.readdirSync('./static/articles')
  return Response.json({ data: files })
}
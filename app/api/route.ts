export const dynamic = 'force-static'
 
export async function GET() {
  return Response.json({ code: 404, data: null, message: 'not found' })
}
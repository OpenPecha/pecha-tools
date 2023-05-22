import {
  NextResponse,
  NextRequest
} from "next/server";
import {
  PrismaClient
} from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(request, {
  params
}) {
  let fileName = params.slug.replace('.mp3','').replace('.wav','');
  console.log(fileName);
  const result = await prisma.$queryRaw`select JSON_EXTRACT(content, '$._session_id') as username, JSON_EXTRACT(content, '$.transcript') as transcript FROM example WHERE JSON_EXTRACT(content, '$.text') = ${fileName}`
  console.log(result);
  return NextResponse.json({
    data: result
  });
}
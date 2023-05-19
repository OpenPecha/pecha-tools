import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(NextRequest) {
  let data = await prisma.example.findMany({
    select:{
      id: true,
      content: true
    }
  });
  const username = NextRequest.nextUrl.searchParams.get("username");
  const workSpace = NextRequest.nextUrl.searchParams.get("workSpace");
  console.log(username, workSpace);
  data = data.map(({id, content}) => ({ id, data:JSON.parse(content).transcript}))
  console.log(data);
  return NextResponse.json({ data });
}

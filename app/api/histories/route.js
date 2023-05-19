import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(NextRequest) {
  //   const data = await prisma.example.findMany();
  const username = NextRequest.nextUrl.searchParams.get("username");
  const workSpace = NextRequest.nextUrl.searchParams.get("workSpace");
  console.log(username, workSpace);
  const data = [
    { id: 1, data: username },
    { id: 2, data: workSpace },
  ];
  return NextResponse.json({ data });
}

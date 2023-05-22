import {
  NextResponse,
  NextRequest
} from "next/server";
import {
  PrismaClient
} from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(NextRequest) {
  const username = NextRequest.nextUrl.searchParams.get("username");
  const workSpace = NextRequest.nextUrl.searchParams.get("workSpace");
  let data = await prisma.example.findMany({
    where: {
      datasets: {
        some: {
          dataset: {
            name: 'stt_cs_review',
          },
        },
      },
    },
    select: {
      id: true,
      content: true,
      datasets: {
        select: {
          dataset: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  console.log(username, workSpace);
  data = data.map(({
    id,
    content,
    datasets
  }) => ({
    id,
    data: JSON.parse(content),
    datasets
  }))
  console.log(JSON.stringify(data[0]));
  return NextResponse.json({
    data: [{
      id: 1,
      data: "data"
    }]
  });
}
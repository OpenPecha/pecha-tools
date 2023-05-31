import { NextResponse, NextRequest } from "next/server";

import { getClient } from "@/utill/database";

export async function GET(request, { params }) {
  let fileName = params.slug.replace(".mp3", "").replace(".wav", "");
  const client = getClient(fileName.slice(0, 6).toLowerCase());
  if (client === null) {
    return NextResponse.json({
      data: [],
      error: "No such workspace"
    });
  }
  const result =
    await client.$queryRaw`
    SELECT JSON_EXTRACT(content,
      '$._session_id') AS username, JSON_EXTRACT(content, '$.transcript') AS transcript, DATETIME(JSON_EXTRACT(content, '$._timestamp'), 'unixepoch') AS submitted_on, JSON_EXTRACT(content, '$.answer') AS answer
    FROM example
    WHERE JSON_EXTRACT(content, '$.text') = ${fileName}`;
  return NextResponse.json({
    data: result,
  });
}

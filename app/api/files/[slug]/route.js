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
    await client.$queryRaw`select JSON_EXTRACT(content, '$._session_id') as username, JSON_EXTRACT(content, '$.transcript') as transcript, DATETIME(JSON_EXTRACT(content, '$._timestamp'), 'unixepoch') as submitted_on FROM example WHERE JSON_EXTRACT(content, '$.text') = ${fileName}`;
  return NextResponse.json({
    data: result,
  });
}

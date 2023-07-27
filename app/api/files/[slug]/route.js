import { NextResponse, NextRequest } from "next/server";

import { getClient } from "@/utill/database";

export async function GET(request, { params }) {
  let fileName = params.slug.replace(".mp3", "").replace(".wav", "");
  const client = getClient();
  if (client === null) {
    return NextResponse.json({
      data: [],
      error: "No such workspace"
    });
  }
  const result =
    await client.$queryRaw`
    SELECT 
      example_json.content->'$._session_id' AS username, 
      example_json.content->'$.transcript' AS transcript,  
      FROM_UNIXTIME(example_json.content->'$._timestamp') AS submitted_on,  
      example_json.content->'$.answer' AS answer
    FROM example_json
    WHERE 
      example_json.content->'$.text' = ${fileName}`;
  return NextResponse.json({
    data: result,
  });
}

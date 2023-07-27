import { NextResponse, NextRequest } from "next/server";
import { getClient } from "@/utill/database";
export async function GET(NextRequest) {
  const workSpace = NextRequest.nextUrl.searchParams.get("workSpace");
  if (workSpace == null) {
    return NextResponse.json({
      data: [],
      error: "workSpace is null",
    });
  }
  const limit = 200;
  const client = getClient();
  let data = await client.$queryRaw`
  select
		example_json.content->'$.text' AS file_name,		
		example_json.content->'$._session_id' AS user, 
    example_json.content->'$.transcript' AS transcript,  
    FROM_UNIXTIME(example_json.content->'$._timestamp') AS submitted_on
	from
		example_json
		join link on example_json.id = link.example_id
		join dataset on dataset.id = link.dataset_id
	where
		dataset.name = ${workSpace} and 
    example_json.content->'$.answer' = 'accept'

  order by
    submitted_on desc
  limit ${limit};`;

  return NextResponse.json({
    data: data,
  });
}

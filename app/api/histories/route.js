import { NextResponse, NextRequest } from "next/server";
import { getClient } from "@/utill/database";
function removeReview(txt) {
  return txt.replace("_review", "");
}
function addReview(txt) {
  return txt + "_review";
}
export async function GET(NextRequest) {
  const workSpace = NextRequest.nextUrl.searchParams.get("workSpace");
  if (workSpace == null) {
    return NextResponse.json({
      data: [],
      error: "workSpace is null",
    });
  }

  const workSpaceTranscribe = removeReview(workSpace);
  const workSpaceReview = addReview(workSpaceTranscribe);
  const limit = 200;
  const client = getClient();
  // TODO: optimize this query
  let data = await client.$queryRaw`
select
  review.audio as file_name,
  review.session_id as reviewer,
  annotation.session_id as transcriber,
  case
    when review.transcript = annotation.transcript then "True"
    else "False"
  end as correct,
  review.transcript as reviewed_transcript,
  annotation.transcript as original_transcript,
  annotation.timestamp as submitted_on,
  review.timestamp as reviewed_on,
  annotation.answer as annotation_answer
from
  (
  select
		example_json.content->'$.text' AS audio,		
		example_json.content->'$._session_id' AS session_id, 
    example_json.content->'$.transcript' AS transcript,  
    FROM_UNIXTIME(example_json.content->'$._timestamp') AS timestamp
	from
		example_json
		join link on example_json.id = link.example_id
		join dataset on dataset.id = link.dataset_id
	where
		dataset.name = ${workSpaceReview}
		and example_json.content->'$.answer' = 'accept'
  ) as review
  left join (
  select
    example_json.content->'$.text' AS audio,		
    example_json.content->'$._session_id' AS session_id, 
    example_json.content->'$.transcript' AS transcript,  
    FROM_UNIXTIME(example_json.content->'$._timestamp') AS timestamp,
    example_json.content->'$.answer' AS answer
  from
    example_json
    join link on example_json.id = link.example_id
    join dataset on dataset.id = link.dataset_id
  where
    dataset.name = ${workSpaceTranscribe}
  ) as annotation on annotation.audio = review.audio
order by
  annotation.timestamp desc
  limit ${limit};`;
  return NextResponse.json({
    data: data,
  });
}

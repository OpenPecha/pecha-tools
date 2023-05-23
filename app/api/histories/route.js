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
  const client = getClient(workSpaceTranscribe.slice(0, 6).toLowerCase());
  let data = await client.$queryRaw`select
  review.audio as file_name,
  review.session_id as reviewer,
  annotation.session_id as transcriber,
  case
      when review.transcript = annotation.transcript then "True"
      else "False"
  end as correct,
  review.transcript as reviewed_transcript,
  annotation.transcript as original_transcript,
  DATETIME(annotation.timestamp, 'unixepoch') as submitted_on,
  DATETIME(review.timestamp, 'unixepoch') as reviewed_on,
  annotation.answer as annotation_answer
from
  (
      select
          json_extract (content, '$.text') as audio,
          json_extract (content, '$._session_id') as session_id,
          json_extract (content, '$.transcript') as transcript,
          json_extract (content, '$._timestamp') as timestamp
      from
          example
          join link on example.id = link.example_id
          join dataset on dataset.id = link.dataset_id
      where
          dataset.name = ${workSpaceReview}
          and json_extract (content, '$.answer') = 'accept'
  ) as review
  left join (
      select
          json_extract (content, '$.text') as audio,
          json_extract (content, '$._session_id') as session_id,
          json_extract (content, '$.transcript') as transcript,
          json_extract (content, '$._timestamp') as timestamp,
          json_extract (content, '$.answer') as answer
      from
          example
          join link on example.id = link.example_id
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

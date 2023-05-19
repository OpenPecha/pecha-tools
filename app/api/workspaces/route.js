import { NextResponse } from "next/server";
const data = [
  "stt_cs",
  "stt_cs_review",
  "stt_tt_ga",
  "stt_tt_gb",
  "stt_tt_gc",
  "stt_tt_gd",
  "stt_tt_ge",
  "stt_tt_gf",
  "stt_tt_gg",
  "stt_tt_ga_review",
  "stt_tt_gb_review",
  "stt_tt_gc_review",
  "stt_tt_gd_review",
  "stt_tt_ge_review",
  "stt_tt_gf_review",
  "stt_tt_gg_review",
  // "stt_mv_ga",
  // "stt_mv_gb",
  // "stt_mv_gc",
  // "stt_mv_gd",
  // "stt_mv_ga_review",
  // "stt_mv_gb_review",
  // "stt_mv_gc_review",
  // "stt_mv_gd_review",
  // "stt_ns",
  // "stt_ns_review",
  // "stt_ab",
  // "stt_ab_review",
];
export async function GET() {
  return NextResponse.json({ data });
}

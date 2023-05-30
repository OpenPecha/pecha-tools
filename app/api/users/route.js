import { NextResponse } from "next/server";
const data = [
  // stt_cs
  "lobsang",
  "chemi",
  // stt_cs_review
  "phurbu",
  // stt_cs_gb
  "tseten",
  "tsepakdorjee",
  "kelsang",
  // stt_cs_gb_review
  "tenchoeku",
  //stt_tt_ga
  "kundol",
  "samp",
  "santen",
  "pandol",
  "kardor",
  "ringgyal",
  //stt_tt_gb
  "dawala",
  "tamdin",
  "loge",
  "kinly",
  "choTsedup",
  "meydon",
  //stt_tt_gc
  "tseyou",
  "thoesam",
  "pema",
  "choesang",
  "keschoki",
  //stt_tt_gd
  "lhundup22",
  "rigdor22",
  "Tsultrim22",
  "Taga22",
  "Tsondue22",
  //stt_tt_ge
  "Yonten", 
  "ddolma",
  "Jigmey", 
  "Thardo", 
  "Samten", 
  "Norbu", 
  "Tsewang", 
  "Tinlaytse",
  //stt_tt_gf
  "choephel",
  "dolma",
  "tsomo",
  "nyidon",
  "sangye",
  "kelsang",
  //stt_tt_gg
  "Lsonam",
  "Lyarphel",
  "Ltsering",
  "Tnamgyal",
  "Knyima",
  //stt_tt_gh
  "GonpoZ",
  "KunchokZ",
  "ChoedakZ",
  "WoeserZ",
  //stt_tt_ga_review
  "nyima",
  //stt_tt_gb_review
  "jamlob",
  //stt_tt_gc_review
  "kaschoedon",
  //stt_tt_gd_review
  "rangdol",
  //stt_tt_ge_review
  "celon",
  //stt_tt_gf_review
  "Dharden",
  //stt_tt_gg_review
  "karma",
  //stt_tt_gh_review
  "DechenZ"
];
export async function GET() {
  return NextResponse.json({ data });
}

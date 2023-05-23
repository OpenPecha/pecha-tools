import { PrismaClient } from "@prisma/client";
const client_stt_cs = new PrismaClient({
  datasources: { db: { url: "file:/usr/local/prodigy/stt_cs_test.sqlite" } },
});
const client_stt_tt = new PrismaClient({
  datasources: { db: { url: "file:/usr/local/prodigy/stt_tt_test.sqlite" } },
});

export function getClient(workSpace) {
  if (workSpace === "stt_cs") {
    return client_stt_cs;
  } else if (workSpace === "stt_tt") {
    return client_stt_tt;
  } else {
    return null;
  }
}

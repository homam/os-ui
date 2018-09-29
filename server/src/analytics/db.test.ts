import uuid from "uuid/v1";
import * as CT from "../common-types";
import { addImpression, addEvent, mkPool, run } from "./db";
import { Pool } from "pg";
import { left } from "fp-ts/lib/Either";


export async function addImpressionTest(pool: Pool) {
  return run(pool, async client => {
    const rockmanId = CT.RockmanId.wrap(uuid());
    const impression = await addImpression(
      client,
      'Server',
      rockmanId,
      CT.userIdFromRockmanId(rockmanId),
      4096,
      CT.HandleName.wrap("first"),
      CT.Url.wrap("/test"),
      CT.IP.wrap("211.25.54.62"),
      CT.Country.wrap("my"),
      {
        "user-agent": "iPhone"
      }
    );
    return impression.rows;
  });
}

export async function addEventTest(pool: Pool, rockmanId: CT.NTRockmanId) {
  return run(pool, async client => {
    const impression = await addEvent(
      client,
      left(rockmanId),
      "Unknown-View",
      "ui-userInt",
      "click",
      "final-cta-button",
      null,
      {
        x: 277,
        y: 361,
        w: 420,
        h: 649
      },
      6613
    );
    return impression.rows;
  });
}

async function main() {
  const pool = await mkPool("postgresql://localhost/os-ui");
  const impression = await addImpressionTest(pool);
  const rockmanId = CT.RockmanId.wrap(impression[0].rockman_id);
  return await addEventTest(pool, rockmanId);
}

main()
  .then(result => console.log(result))
  .catch(error => console.error(error));

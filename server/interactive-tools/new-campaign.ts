import * as PG from "pg";
import yargs from "yargs";
import { encrypt } from "../src/campaigns/campaignId";

const { page, country, comments, affid } = yargs
  .usage(
    `Usage: $0 --page "some-page" --country ISOCode --affid "affiliate-id" --comments "Some comments"`
  )
  // .command("count", "Count the lines in a file")
  // .example("$0 count -f foo.js", "count the lines in the given file")
  .option("page", {
    demandOption: true,
    describe: "an existing page",
    type: "string"
  })
  .option("country", {
    demandOption: true,
    describe: "ISO code of the country",
    type: "string",
    coerce: x => x.toLowerCase()
  })
  .option("affid", {
    demandOption: true,
    describe: "Affiliate Id for the source of this campaign",
    type: "string"
  })
  .option("comments", {
    describe: "Some optional comments",
    type: "string"
  })
  .group(["page", "country", "affid"], "Campaign Options")
  .parse(process.argv);

const client = new PG.Client({
  connectionString: process.env.osui_connection_string
});

async function main() {
  try {
    await client.connect();
    const result = await client.query(
      `
        with src as (select id from sources where affiliate_id = $3)
        INSERT INTO campaigns(
          page
        , country
        , source_id
        , comments
        ) VALUES (
          $1
        , $2
        , (select id from src)
        , $4
        )
        returning *
    `,
      [page, country, affid, comments]
    );
    const campaign = result.rows[0];
    const xcid = encrypt(campaign.id + 4095);
    const result2 = await client.query(
      `
        update campaigns set xcid = $2 where id = $1
        returning *
    `,
      [campaign.id, xcid]
    );

    return result2.rows[0]
  } finally {
    await client.end();
  }
}

main()
  .then(x => console.log(x || ""))
  .catch(ex => {
    console.error(ex);
    process.exit(1);
  });

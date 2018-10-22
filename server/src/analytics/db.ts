import * as PG from "pg";
import * as CT from "../common-types";
import { Either } from "fp-ts/lib/Either";

interface IHeaders {
  [key: string]: string | string[];
}

interface IEventArgs {
  [key: string]: string | number | boolean;
}

export type ImpressionEndpoints = 'Server' | 'Client'

export function addImpression(
  client: PG.PoolClient,
  endpoint: ImpressionEndpoints,
  rockmanId: CT.NTRockmanId,
  userId: CT.NTUserId,
  campaignId: number,
  page: CT.NTHandleName,
  originalUrl: CT.NTUrl,
  ip: CT.NTIP,
  ipCountry: CT.NTCountry,
  headers: IHeaders,
  query: IHeaders
) {
  return client.query(
    `
    INSERT INTO impressions(
        rockman_id
      , campaign_id
      , ip
      , headers
      , ip_country_alpha2
      , user_id
      , original_url
      , page
      , endpoint
      , query
    ) VALUES (
        $1
      , $2
      , $3
      , $4
      , $5
      , $6
      , $7
      , $8
      , $9
      , $10
    ) returning *
  `,
    [
      CT.RockmanId.unwrap(rockmanId),
      campaignId,
      CT.IP.unwrap(ip),
      headers,
      CT.Country.unwrap(ipCountry),
      CT.UserId.unwrap(userId),
      CT.Url.unwrap(originalUrl),
      CT.HandleName.unwrap(page),
      endpoint,
      query
    ]
  );
}

export function addEvent(
  client: PG.PoolClient,
  rockmanOrImpressionId: Either<CT.NTRockmanId, CT.NTImpressionId>,
  view: string,
  category: string,
  action: string,
  label: string,
  value: number,
  args: IEventArgs,
  client_rel_time: number
) {
  return client.query(
    rockmanOrImpressionId.fold(
      _ => `
      with imp as (select id from impressions where rockman_id = $1)
      insert into events(
          impression_id
        , category
        , action
        , label
        , value
        , args
        , client_rel_time
        , view
      ) values (
          (select id from imp)
        , $2
        , $3
        , $4
        , $5
        , $6
        , $7
        , $8
      )
    `,
      _ => `
      insert into events(
          impression_id
        , category
        , action
        , label
        , value
        , args
        , client_rel_time
        , view
      ) values (
          $1
        , $2
        , $3
        , $4
        , $5
        , $6
        , $7
        , $8
      ) returning *
    `
    ),
    [
      rockmanOrImpressionId.fold(
        rockmanId => CT.RockmanId.unwrap(rockmanId),
        impressionId => CT.ImpressionId.unwrap(impressionId).toString()
      ),
      category,
      action,
      label,
      value,
      args,
      client_rel_time,
      view
    ]
  );
}

export async function run<T>(
  pool: PG.Pool,
  f: (client: PG.PoolClient) => Promise<T>
) {
  const client = await pool.connect();
  try {
    return f(client);
  } finally {
    client.release();
  }
}

export const run_ = <T>(
  pool: PG.Pool,
  f: (client: PG.PoolClient) => Promise<T>
) => run(pool, f).catch(ex => console.error("Error in run_", ex))


export function mkPool(connectionString: string) {
  const config: PG.PoolConfig = {
    connectionString
  };
  const pool = new PG.Pool(config);

  pool.on("error", (err, client) => {
    console.error("[PG Pool] Unexpected error on idle client", err);
    client.release();
  });

  function cleanup() {
    pool
      .end()
      .then(result => {
        console.log("[PG Pool] Cleanedup, bye!", result);
        process.exit(2);
      })
      .catch(error => {
        console.error(error);
        process.exit(2);
      });
  }

  process.on("SIGINT", function() {
    console.info("[PG Pool] Handling Ctrl-C...");
    cleanup();
  });

  process.on("SIGTERM", function() {
    console.info("[PG Pool] Handling SIGTERM...");
    cleanup();
  });

  process.on("uncaughtException", function(args) {
    console.info("[PG Pool] Handling uncaughtException...");
    cleanup();
  });

  return pool;
}

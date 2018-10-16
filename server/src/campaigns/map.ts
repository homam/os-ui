import * as CT from '../common-types'
import {Option, some, none} from 'fp-ts/lib/Option'
import {CampaignValue} from "./types"
import NodeCache from 'node-cache'
import * as PG from "pg";
const campaignsCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

export default async function getCampaign(client: PG.PoolClient, campaignId: number) : Promise<Option<CampaignValue>> {
  const campaign = campaignsCache.get(campaignId)
  if(campaign != undefined) {
    return campaign as Option<CampaignValue>
  } else {
    const dbCampaignResult = await client.query(`
      select c.id, c.page, c.country, s.affiliate_id, s.offer_id from campaigns c
      inner join sources s on c.source_id = s.id
      where c.id = $1
    `, [campaignId])
    if(dbCampaignResult.rowCount == 0) {
      campaignsCache.set(campaignId, none)
      return none;
    } else {
      const {id, page, country, affiliate_id, offer_id} = dbCampaignResult.rows[0];
      const campaign = some({
        id: campaignId,
        page: CT.HandleName.wrap(page),
        country: CT.Country.wrap(country),
        affiliateInfo: { offerId: CT.OfferId.wrap(offer_id), affiliateId: CT.AffiliateId.wrap(affiliate_id) } as CT.AffiliateInfo
      })
      campaignsCache.set(campaignId, campaign);
      return campaign
    }
  }
}

export const invalidCampaign = {
  id: 4097,
  page: CT.HandleName.wrap('invalid-campaign-id'),
  country: CT.Country.wrap('xx'),
  affiliateInfo: { offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('UNKNOWN')} as CT.AffiliateInfo
}

export const testCampaign = (page, country) => ({
  id: 4096,
  page: CT.HandleName.wrap(page),
  country: CT.Country.wrap(country),
  affiliateInfo: { offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('SAM')} as CT.AffiliateInfo
})
import * as CT from '../common-types'
import {Option, some, none } from 'fp-ts/lib/Option'
import {CampaignValue, AffiliateInfoGetter, ResolvedCampaignValue} from "./types"
import NodeCache from 'node-cache'
import * as PG from "pg";
import { right, left } from 'fp-ts/lib/Either';
const campaignsCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const affiliatesOfferCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

async function getAffiliateByOfferId(client: PG.PoolClient, offerId: number) : Promise<Option<CT.AffiliateInfo>> {
  const affiliate = affiliatesOfferCache.get(offerId)
  if(affiliate != undefined) {
    return affiliate as Option<CT.AffiliateInfo>
  } else {
    const dbAffiliateResult = await client.query(`
      select s.affiliate_id, s.offer_id from sources as s where s.offer_id = $1
    `, [offerId]
    )
    if(dbAffiliateResult.rowCount == 0) {
      affiliatesOfferCache.set(offerId, none)
      return none
    } else {
      const {affiliate_id, offer_id} = dbAffiliateResult.rows[0];
      const affiliate = some({ offerId: CT.OfferId.wrap(offer_id), affiliateId: CT.AffiliateId.wrap(affiliate_id) } as CT.AffiliateInfo)
      affiliatesOfferCache.set(offerId, affiliate)
      return affiliate
    }
  }
}
/**
 * There are two type of campaigns:
 *  - Campaigns with known affiliate and offerId.
 *  - Campaigns with 'free' (Unknown) affiliate and offerId.
 *    We must receive `offer` as a query string parameter for these campaigns.
 *  This duality is reflected in `AffiliateInfo` type 
 *  (which is the type of `affiliateInfo` field of `CampaignValue`). 
 * @export
 * @param {PG.PoolClient} client
 * @param {number} campaignId
 * @returns {Promise<Option<CampaignValue>>}
 */
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
      const {page, country, affiliate_id, offer_id} = dbCampaignResult.rows[0];
      let affiliateInfo : AffiliateInfoGetter
      if(!offer_id) {
        affiliateInfo = right(
          async (client: PG.PoolClient, offerId: CT.NTOfferId) =>
            (await getAffiliateByOfferId(client, CT.OfferId.unwrap(offerId)))
              .fold({ offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('Unknown') }, x => x)
          )
      } else {
        affiliateInfo = left({ offerId: CT.OfferId.wrap(offer_id), affiliateId: CT.AffiliateId.wrap(affiliate_id) } as CT.AffiliateInfo)
      }
      const campaign : Option<CampaignValue> = some({
        id: campaignId,
        page: CT.HandleName.wrap(page),
        country: CT.Country.wrap(country),
        affiliateInfo
      })
      campaignsCache.set(campaignId, campaign);
      return campaign
    }
  }
}

export const invalidCampaign : ResolvedCampaignValue = {
  id: 4097,
  page: CT.HandleName.wrap('invalid-campaign-id'),
  country: CT.Country.wrap('xx'),
  affiliateInfo: { offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('UNKNOWN')} as CT.AffiliateInfo
}

export const testCampaign = (page: string, country: string) : CampaignValue => ({
  id: 4096,
  page: CT.HandleName.wrap(page),
  country: CT.Country.wrap(country),
  affiliateInfo: right(
    () => 
      Promise.resolve({ offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('SAM') } as CT.AffiliateInfo)
  )
})
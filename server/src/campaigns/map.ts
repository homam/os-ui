import * as CT from '../common-types'
import {Option, some, none } from 'fp-ts/lib/Option'
import {CampaignValue} from "./types"
import NodeCache from 'node-cache'
import * as PG from "pg";
import express = require('express');
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
    } else {
      const {affiliate_id, offer_id} = dbAffiliateResult.rows[0];
      const affiliate = some({ offerId: CT.OfferId.wrap(offer_id), affiliateId: CT.AffiliateId.wrap(affiliate_id) } as CT.AffiliateInfo)
      affiliatesOfferCache.set(offerId, affiliate)
      return affiliate
    }
  }
}

export default async function getCampaign(client: PG.PoolClient, campaignId: number, req: express.Request) : Promise<Option<CampaignValue>> {
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
      let affiliateInfo : CT.AffiliateInfo
      if(!offer_id) {
        affiliateInfo = (await getAffiliateByOfferId(client, parseInt(req.query['offer'])))
          .fold({offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('Unknown') }, x => x)
      } else {
        affiliateInfo = { offerId: CT.OfferId.wrap(offer_id), affiliateId: CT.AffiliateId.wrap(affiliate_id) } as CT.AffiliateInfo
      }
      const campaign = some({
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
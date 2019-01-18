import * as CT from '../common-types'
import * as PG from "pg";
import { Either } from 'fp-ts/lib/Either';

export type AffiliateInfoGetter = Either<CT.AffiliateInfo, (client: PG.PoolClient, offerId: CT.NTOfferId) => Promise<CT.AffiliateInfo>>

export type UnresolvedCampaignValue = {
  id: number,
  page: CT.NTHandleName,
  country: CT.NTCountry,
  affiliateInfo: AffiliateInfoGetter
}

export type ResolvedCampaignValue = {
  id: number,
  page: CT.NTHandleName,
  country: CT.NTCountry,
  affiliateInfo: CT.AffiliateInfo
}

export async function toResolvedCampaignValue(campaign: UnresolvedCampaignValue, client: PG.PoolClient, offerId: CT.NTOfferId) {
  const affiliateInfo = await campaign.affiliateInfo.fold(x => Promise.resolve(x), x => x(client, offerId))
  return {...campaign, affiliateInfo}
}
import * as CT from '../common-types'
import {Option, some, none} from 'fp-ts/lib/Option'
import {CampaignValue} from "./types"


export const invalidCampaign = {
  page: CT.HandleName.wrap('invalid-campaign-id'),
  country: CT.Country.wrap(''),
  affiliateInfo: { offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('UNKNWON')} as CT.AffiliateInfo
}

const campaignIdMap = {
  4096: {
    page: CT.HandleName.wrap('first'),
    country: CT.Country.wrap('ke'),
    affiliateInfo: { offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('SAM')} as CT.AffiliateInfo
  }
}

export function find(campaignId: number) : Option<CampaignValue> {
  const v = campaignIdMap[campaignId]
  if(!!v) {
    return some(v);
  } else {
    return none;
  }
}
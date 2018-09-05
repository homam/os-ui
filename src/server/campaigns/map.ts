import * as CT from '../common-types'
import {Option, some, none} from 'fp-ts/lib/Option'

type Value = {
  page: CT.NTHandleName,
  country: CT.NTCountry,
  affiliateInfo: CT.AffiliateInfo
}

const campaignIdMap = {
  4096: {
    page: CT.HandleName.wrap('first'),
    country: CT.Country.wrap('ke'),
    affiliateInfo: { offerId: CT.OfferId.wrap(1), affiliateId: CT.AffiliateId.wrap('SAM')} as CT.AffiliateInfo
  }
}

export default function map(campaignId: number) : Option<Value> {
  const v = campaignIdMap[campaignId]
  if(!!v) {
    return some(v);
  } else {
    return none;
  }
}
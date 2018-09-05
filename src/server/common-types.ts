import { Newtype, iso } from "newtype-ts";

export interface NTCountry
  extends Newtype<{ readonly Country: unique symbol }, string> {}
export const Country = iso<NTCountry>();

export interface NTHandleName
  extends Newtype<{ readonly HandleName: unique symbol }, string> {}
export const HandleName = iso<NTHandleName>();

export interface NTAdName
  extends Newtype<{ readonly AdName: unique symbol }, string> {}
export const AdName = iso<NTAdName>();

export interface NTSubMethod
  extends Newtype<{ readonly SubMethod: unique symbol }, string> {}
export const SubMethod = iso<NTSubMethod>();

export interface NTOfferId
  extends Newtype<{ readonly OfferId: unique symbol }, number> {}
export const OfferId = iso<NTOfferId>();

export interface NTAffiliateId
  extends Newtype<{ readonly AffiliateId: unique symbol }, string> {}
export const AffiliateId = iso<NTAffiliateId>();

export type AffiliateInfo = {
  offerId: NTOfferId;
  affiliateId: NTAffiliateId;
};

export interface NTRockmanId
  extends Newtype<{ readonly RockmanId: unique symbol }, string> {}
export const RockmanId = iso<NTRockmanId>();

export interface NTUserId
  extends Newtype<{ readonly UserId: unique symbol }, string> {}
export const UserId = iso<NTUserId>();

export const userIdFromRockmanId = (r: NTRockmanId) => UserId.wrap(RockmanId.unwrap(r))

export interface NTUrl extends Newtype<{ readonly Url: unique symbol }, string> {}
export const Url = iso<NTUrl>();

export interface NTIP extends Newtype<{ readonly IP: unique symbol }, string> {}
export const IP = iso<NTIP>();
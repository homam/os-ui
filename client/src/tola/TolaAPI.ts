import * as TS from "./TolaState";
import * as RDS from "../common-types/RemoteDataState";

class TolaApiError extends Error {
  constructor(message: string, errorType: TS.TolaErrorTypes, details: any) {
    super(message);
    this.message = message;
    this.errorType = errorType;
    this.details = details;
    Object.setPrototypeOf(this, TolaApiError.prototype);
  }
  errorType: TS.TolaErrorTypes;
  details: any;
}

const root = "tola-api.sam-media.com";
var timeoutInSeconds = 60;
const version = "v1"; // use 'mock' for testing, use 'v1' for actually sending a charge request to the user

export function chargeAndWait1(msisdn: string, message: string, price: number) {
  const wait = ms => new Promise(res => setTimeout(res, ms));
  const reject = (
    errorType: TS.TolaErrorTypes,
    message?: string,
    details?: any
  ) =>
    Promise.reject(new TolaApiError(message || errorType, errorType, details));

  // Testing different states
  /*
	var mockState = "";
	if(price == 10) mockState = "MockChargeResponseError";
	else if(price == 200) mockState = "MockDisbursementNotificationError";
	else if(price == 100) timeoutInSeconds = 3;
	
	else  {
		mockState = "";
		var timeoutInSeconds = 60;
	}
	  
	return fetch(`https://${root}/${version}/api/charge/${msisdn}/${price}/${message}?mock=` + mockState )*/

  return fetch(
    `https://${root}/${version}/api/charge/${msisdn}/${price}/${message}`
  )
    .then(x => x.json())
    .then(
      x =>
        !x.tolaResponse.success
          ? reject(
              "FailChargeResponseReceived",
              x.tolaResponse.error.message,
              x.tolaResponse.error
            )
          : x
    )
    .then(x => {
      console.log(x);
      const chargeRequestId = x.chargeRequestId;
      const check = i =>
        i > timeoutInSeconds
          ? reject("Timeout")
          : fetch(
              `https://${root}/${version}/api/check_charge/${chargeRequestId}`
            )
              .then(x => x.json())
              .then(x => {
                console.log(x);
                const waitMore = () =>
                  wait(1000 /* recheck every one second */).then(() =>
                    check(i + 1)
                  );
                switch (x.state) {
                  case "ChargeRequestCreated":
                    return waitMore();
                  case "SuccessChargeResponseReceived":
                    return waitMore();
                  case "FailChargeResponseReceived":
                    return reject("FailChargeResponseReceived");
                  case "SuccessLodgementNotificationReceived":
                    return waitMore();
                  case "FailLodgementNotificationReceived":
                    return reject("FailLodgementNotificationReceived");
                  case "SuccessDisbursementNotificationReceived":
                    return x; // final state
                  case "FailDisbursementNotificationReceived":
                    return reject("FailDisbursementNotificationReceived");
                  default:
                    console.log("Unexpected state: ", x.state);
                    return waitMore();
                }
              });
      return check(0);
    });
}

export type TolaRDS = RDS.RemoteDataState<
  TS.TolaErrors<string>,
  TS.TolaSuccessResult
>;

export const chargeAndWait = (
  msisdn: string,
  message: string,
  price: number,
  callback: ((state: TolaRDS) => void)
): void => {
  callback(RDS.Loading());
  chargeAndWait1(msisdn, message, price)
    .then(_ => callback(RDS.Success(TS.Success())))
    .catch((e: TolaApiError) =>
      callback(RDS.Failure(TS.mkTolaError(e.errorType, e.message)))
    );
};

export interface ITolaActions {
  chargeAndWait: (msisdn: string, message: string, price: number) => any;
  backToNothingYet: () => any;
}

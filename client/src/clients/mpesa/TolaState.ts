export type TolaErrorTypes =
  | "InvalidMSISDN"
  | "FailChargeResponseReceived"
  | "FailLodgementNotificationReceived"
  | "FailDisbursementNotificationReceived"
  | "Timeout"
  | "UnknownError";

export type TolaErrors<E> = { type: TolaErrorTypes; error: E };

export type TolaSuccessResult = { type: "Success" };

export function match<R>({
  success
}: {
  // waiting: () => R;
  success: () => R;
}): (model: TolaSuccessResult) => R {
  return model => {
    switch (model.type) {
      case "Success":
        return success();
    }
  };
}

// export const Waiting = <E>(): TolaResult<E> => ({ type: "Waiting" });
export const Success = (): TolaSuccessResult => ({ type: "Success" });

export const mkTolaError = <E>(type: TolaErrorTypes, error: E) => ({
  type: type,
  error: error
});

import { isError } from "util";

export type RemoteDataState<E, D> =
  | { type: "NothingYet" }
  | { type: "Loading" }
  | { type: "Failure"; error: E }
  | { type: "Success"; data: D };

export interface IMatcher<E, D, R> {
  nothingYet: () => R;
  loading: () => R;
  failure: (error: E) => R;
  success: (data: D) => R;
}

export interface ISuccessMatcher<E, D, R> {
  success: (data: D) => R;
  otherwise: (rds: RemoteDataState<E, D>) => R;
}

export function match<E, D, R>({
  nothingYet,
  loading,
  failure,
  success
}: IMatcher<E, D, R>): (model: RemoteDataState<E, D>) => R {
  return model => {
    switch (model.type) {
      case "NothingYet":
        return nothingYet();
      case "Loading":
        return loading();
      case "Failure":
        return failure(model.error);
      case "Success":
        return success(model.data);
    }
  };
}

export const NothingYet = <E, D>(): RemoteDataState<E, D> => ({
  type: "NothingYet"
});

export const Loading = <E, D>(): RemoteDataState<E, D> => ({
  type: "Loading"
});

export const Failure = <E, D>(error: E): RemoteDataState<E, D> => ({
  type: "Failure",
  error: error
});

export const Success = <E, D>(data: D): RemoteDataState<E, D> => ({
  type: "Success",
  data: data
});

export const IsNothingYet = <E, D>(s: RemoteDataState<E, D>) =>
  s.type == "NothingYet";
export const IsLoading = <E, D>(s: RemoteDataState<E, D>) =>
  s.type == "Loading";
export const IsFailure = <E, D>(s: RemoteDataState<E, D>) =>
  s.type == "Failure";
export const IsSuccess = <E, D>(s: RemoteDataState<E, D>) =>
  s.type == "Success";


  

export const WhenFailure = <E, D, R>(d: R, r: (err: E) => R) => (
  s: RemoteDataState<E, D>
) => (s.type == "Failure" ? r(s.error) : d);

export const WhenLoading = <D, R>(d: R, r: () => R) => (
  s: RemoteDataState<any, D>
) => (s.type == "Loading" ? r() : d);

export const MatchFailure = <E, D, R>({failure, otherwise} : {otherwise: () => R, failure: (err: E) => R}) => (
  s: RemoteDataState<E, D>
) => (s.type == "Failure" ? failure(s.error) : otherwise());


export const MatchSuccess = <E, D, R>({success, otherwise} : ISuccessMatcher<E, D, R>) => (
  s: RemoteDataState<E, D>
) => (s.type == "Success" ? success(s.data) : otherwise(s));

declare module 'tiny-async-pool' {
  export default function <T, R>(poolLimit: number, array: T[], iteratorFn: (item: T) => Promise<R>) : Promise<R[]>;
}
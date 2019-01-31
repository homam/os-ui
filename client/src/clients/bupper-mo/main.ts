type IResult = {
  status:boolean,
  smsBody?:string,
  error?:string,
  os?:string,
  osVersion?:string,
  action:string,
  step:string,
  isOptimizeMo:boolean
}
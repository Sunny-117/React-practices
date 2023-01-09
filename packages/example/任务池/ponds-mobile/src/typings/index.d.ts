declare interface ResponseBody<T = any> {
  code: number;
  msg: string;
  data: T;
}

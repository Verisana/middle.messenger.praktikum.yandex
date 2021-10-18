export type PlainObject<T = any> = {
  [k in string]: T
}

export type RequestData = Record<
  string,
  string | number | Array<string | number> | FormData
>

export interface IRequestOptions {
  method?: string
  retries?: number
  timeout?: number
  headers?: Record<string, string>
  withCredentials?: boolean
  responseType?: string
}

export type Events = Record<string, [EventListener]>

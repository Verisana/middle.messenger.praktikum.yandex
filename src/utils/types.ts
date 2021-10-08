export type PlainObject<T = any> = {
    [k in string]: T
}

export type RequestData = Record<
    string,
    string | number | Array<string | number>
>

export interface IRequestOptions {
    method?: string
    retries?: number
    data?: RequestData | FormData
    timeout?: number
    headers?: Record<string, string>
    withCredentials?: boolean
    responseType?: string
}

export type Events = Record<string, [EventListener]>

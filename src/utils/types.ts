export type PlainObject<T = any> = {
    [k in string]: T
}

export type ParamAble = Record<string, string | number | Array<string | number>>

export interface IRequestOptions {
    method?: string
    retries?: number
    data?: ParamAble
    timeout?: number
    headers?: Record<string, string>
}

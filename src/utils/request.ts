import { IRequestOptions, RequestData } from "./types"
import { queryString } from "./utils"

export enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export class Request {
    url: string

    constructor(url?: string) {
        this.url = url === undefined ? "" : url
    }

    get(
        endpoint: string,
        data: RequestData | FormData = {},
        options: IRequestOptions = {}
    ) {
        return this.request(endpoint, data, { ...options, method: METHODS.GET })
    }

    post(
        endpoint: string,
        data: RequestData | FormData = {},
        options: IRequestOptions = {}
    ) {
        return this.request(endpoint, data, {
            ...options,
            method: METHODS.POST
        })
    }

    put(
        endpoint: string,
        data: RequestData | FormData = {},
        options: IRequestOptions = {}
    ) {
        return this.request(endpoint, data, { ...options, method: METHODS.PUT })
    }

    delete(
        endpoint: string,
        data: RequestData | FormData = {},
        options: IRequestOptions = {}
    ) {
        return this.request(endpoint, data, {
            ...options,
            method: METHODS.DELETE
        })
    }

    async request(
        endpoint: string,
        data: RequestData | FormData,
        options: IRequestOptions
    ): Promise<XMLHttpRequest> {
        const url = `${this.url}${endpoint}`

        const { retries = 1 } = options

        const onError = (err: Error) => {
            const triesLeft = retries - 1
            if (!triesLeft) {
                throw err
            }
            return this.request(url, data, {
                ...options,
                retries: triesLeft
            })
        }

        return this.requestBase(url, data, options).catch(onError)
    }

    private requestBase = (
        url: string,
        data: RequestData | FormData,
        options: IRequestOptions
    ): Promise<XMLHttpRequest> => {
        const {
            headers = {
                "Content-Type": "application/json",
                accept: "application/json"
            },
            method = METHODS.GET,
            withCredentials = true,
            responseType = "json",
            timeout = 3000
        } = options
        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error("No method provided"))
                return
            }

            const xhr = new XMLHttpRequest()
            const isGet = method === METHODS.GET

            xhr.open(
                method,
                isGet && !!data ? `${url}?${queryString(data)}` : url
            )
            xhr.withCredentials = withCredentials

            // @ts-expect-error
            xhr.responseType = responseType

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key])
            })

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr)
                } else {
                    reject(xhr)
                }
            }

            xhr.onabort = reject
            xhr.onerror = reject

            xhr.timeout = timeout
            xhr.ontimeout = reject

            if (isGet || !data) {
                xhr.send()
            } else if (data instanceof FormData) {
                xhr.send(data)
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }
}

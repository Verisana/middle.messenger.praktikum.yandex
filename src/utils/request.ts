import { IRequestOptions } from "./types"
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

    get(endpoint: string, options = {}) {
        return this.request(endpoint, { ...options, method: METHODS.GET })
    }

    post(endpoint: string, options = {}) {
        return this.request(endpoint, { ...options, method: METHODS.POST })
    }

    put(endpoint: string, options = {}) {
        return this.request(endpoint, { ...options, method: METHODS.PUT })
    }

    delete(endpoint: string, options = {}) {
        return this.request(endpoint, { ...options, method: METHODS.DELETE })
    }

    async request(
        endpoint: string,
        options: IRequestOptions
    ): Promise<XMLHttpRequest> {
        const url = `${this.url}${endpoint}`

        const { retries = 1 } = options

        const onError = (err: Error) => {
            const triesLeft = retries - 1
            if (!triesLeft) {
                throw err
            }
            return this.request(url, {
                ...options,
                retries: triesLeft
            })
        }

        return this.requestBase(url, options).catch(onError)
    }

    private requestBase = (
        url: string,
        options: IRequestOptions
    ): Promise<XMLHttpRequest> => {
        const {
            headers = { "content-type": "application/json" },
            method = METHODS.GET,
            data,
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
                isGet && !!data ? `${url}${queryString(data)}` : url
            )

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key])
            })

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
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
            } else {
                xhr.send(JSON.stringify(data))
            }
        })
    }
}

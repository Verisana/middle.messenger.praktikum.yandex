export enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export type ParamAble = Record<string, string | number | Array<string | number>>

function queryStringify(data: ParamAble) {
    const keys = Object.keys(data)
    return keys.reduce((result, key, index) => {
        return `${result}${key}=${data[key]}${
            index < keys.length - 1 ? "&" : ""
        }`
    }, "?")
}

export interface IRequestOptions {
    method?: string
    retries?: number
    data?: ParamAble
    timeout?: number
    headers?: Record<string, string>
}

export class Request {
    get(url: string, options = {}) {
        return this.request(url, { ...options, method: METHODS.GET })
    }

    post(url: string, options = {}) {
        return this.request(url, { ...options, method: METHODS.POST })
    }

    put(url: string, options = {}) {
        return this.request(url, { ...options, method: METHODS.PUT })
    }

    delete(url: string, options = {}) {
        return this.request(url, { ...options, method: METHODS.DELETE })
    }

    async request(
        url: string,
        options: IRequestOptions
    ): Promise<XMLHttpRequest> {
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
            headers = {},
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
                isGet && !!data ? `${url}${queryStringify(data)}` : url
            )

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key])
            })

            xhr.onload = () => {
                resolve(xhr)
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

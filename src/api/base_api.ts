import { backendUrl } from "../consts"
import { Request } from "../utils/request"

export abstract class BaseAPI {
    protected request: Request

    protected constructor(endpoint: string) {
        this.request = new Request(`${backendUrl}${endpoint}`)
    }

    protected create() {
        throw new Error("Not implemented")
    }

    protected read() {
        throw new Error("Not implemented")
    }

    protected update() {
        throw new Error("Not implemented")
    }

    protected delete() {
        throw new Error("Not implemented")
    }
}

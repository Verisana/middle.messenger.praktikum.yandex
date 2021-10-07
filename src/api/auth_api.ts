import { IRequestOptions } from "../utils/types"
import { BaseAPI } from "./base_api"
import { ILoginRequest, IRegisterRequest } from "./types"

export class AuthAPI extends BaseAPI {
    constructor() {
        super("/auth")
    }

    login(data: ILoginRequest): Promise<XMLHttpRequest> {
        return this.request.post("/signin", {
            data,
            withCredentials: true
        } as IRequestOptions)
    }

    register(data: IRegisterRequest) {
        return this.request.post("/signup", {
            data,
            withCredentials: true
        } as IRequestOptions)
    }

    logout() {
        return this.request.post("/logout", {
            withCredentials: true
        } as IRequestOptions)
    }

    userRead() {
        return this.request.get("/user", {
            withCredentials: true
        } as IRequestOptions)
    }
}

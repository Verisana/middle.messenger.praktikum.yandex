import { BaseAPI } from "./base_api"
import { ILoginRequest, IRegisterRequest } from "./types"

export class AuthAPI extends BaseAPI {
    constructor() {
        super("/auth")
    }

    login(data: ILoginRequest): Promise<XMLHttpRequest> {
        return this.request.post("/signin", { data })
    }

    register(data: IRegisterRequest) {
        return this.request.post("/signup", { data })
    }

    logout() {
        return this.request.post("/logout")
    }

    userRead() {
        return this.request.get("/user")
    }
}

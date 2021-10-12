import { IRequestOptions } from "../utils/types"
import { BaseAPI } from "./base_api"
import { IProfilePasswordUpdateRequest, IProfileUpdateRequest } from "./types"

export class UsersAPI extends BaseAPI {
    constructor() {
        super("/user")
    }

    updateProfile(data: IProfileUpdateRequest): Promise<XMLHttpRequest> {
        return this.request.put("/profile", data)
    }

    updateAvatar(data: FormData): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            headers: {}
        }
        return this.request.put("/profile/avatar", data, options)
    }

    updatePassword(
        data: IProfilePasswordUpdateRequest
    ): Promise<XMLHttpRequest> {
        return this.request.put("/password", data)
    }

    search(login: string): Promise<XMLHttpRequest> {
        return this.request.post("/search", { login })
    }
}

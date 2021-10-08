import { IRequestOptions } from "../utils/types"
import { BaseAPI } from "./base_api"
import { IProfilePasswordUpdateRequest, IProfileUpdateRequest } from "./types"

export class UserAPI extends BaseAPI {
    constructor() {
        super("/user")
    }

    updateProfile(data: IProfileUpdateRequest): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.put("/profile", options)
    }

    updateAvatar(data: any): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
                accept: "application/json"
            }
        }
        return this.request.put("/profile/avatar", options)
    }

    updatePassword(
        data: IProfilePasswordUpdateRequest
    ): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.put("/password", options)
    }

    search(login: string): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data: { login },
            withCredentials: true
        }
        return this.request.put("/profile", options)
    }
}

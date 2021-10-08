import { IRequestOptions } from "../utils/types"
import { BaseAPI } from "./base_api"
import {
    IChatsCreateRequest,
    IChatsDeleteRequest,
    IChatsRequest,
    IChatsUsersModifyRequest
} from "./types"

export class ChatsAPI extends BaseAPI {
    constructor() {
        super("/chats")
    }

    get(data?: IChatsRequest): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.get("", options)
    }

    create(data: IChatsCreateRequest): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.post("", options)
    }

    delete(data: IChatsDeleteRequest): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.delete("", options)
    }

    addUsers(data: IChatsUsersModifyRequest): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.put("/users", options)
    }

    deleteUsers(data: IChatsUsersModifyRequest): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.delete("/users", options)
    }

    updateAvatar(data: FormData): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true,
            headers: {}
        }
        return this.request.put("/avatar", options)
    }
}

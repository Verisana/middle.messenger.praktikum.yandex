import { IRequestOptions } from "../utils/types"
import { BaseAPI } from "./base_api"
import {
    IChatsGetUsers,
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

    create(title: string): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data: { title },
            withCredentials: true
        }
        return this.request.post("", options)
    }

    delete(chatId: number): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data: { chatId },
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

    getUsers(data: IChatsGetUsers): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true
        }
        return this.request.get(`/${data.id}/users`, options)
    }

    getToken(id: number): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data: { id },
            withCredentials: true
        }
        return this.request.post(`/token/${id}`, options)
    }
}

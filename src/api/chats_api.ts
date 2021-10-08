import { IRequestOptions } from "../utils/types"
import { BaseAPI } from "./base_api"

export class ChatsAPI extends BaseAPI {
    constructor() {
        super("/chats")
    }

    get() {}

    create() {}

    delete() {}

    addUsers() {}

    deleteUsers() {}

    updateAvatar(data: FormData): Promise<XMLHttpRequest> {
        const options: IRequestOptions = {
            data,
            withCredentials: true,
            headers: {}
        }
        return this.request.put("/avatar", options)
    }
}

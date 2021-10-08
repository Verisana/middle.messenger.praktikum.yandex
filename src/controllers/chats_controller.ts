import { ChatsAPI } from "../api"
import {
    IChatsCreateRequest,
    IChatsDeleteRequest,
    IChatsRequest,
    IChatsUsersModifyRequest
} from "../api/types"

class ChatsController {
    private api: ChatsAPI

    constructor() {
        this.api = new ChatsAPI()
    }

    async get(data?: IChatsRequest) {
        try {
            const response = await this.api.get(data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    async create(data: IChatsCreateRequest) {
        try {
            const response = await this.api.create(data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    async delete(data: IChatsDeleteRequest) {
        try {
            const response = await this.api.delete(data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    async addUsers(data: IChatsUsersModifyRequest) {
        try {
            const response = await this.api.addUsers(data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    async deleteUsers(data: IChatsUsersModifyRequest) {
        try {
            const response = await this.api.deleteUsers(data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    async updateAvatar(formData: FormData) {
        try {
            const response = await this.api.updateAvatar(formData)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new ChatsController()

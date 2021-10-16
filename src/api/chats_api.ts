import { IRequestOptions } from "../utils/types"
import { BaseAPI } from "./base_api"
import {
  IChatsGetUsers,
  IChatsRequest,
  IChatsUsersModifyRequest
} from "./types"

class ChatsAPI extends BaseAPI {
  constructor() {
    super("/chats")
  }

  get(data?: IChatsRequest): Promise<XMLHttpRequest> {
    return this.request.get("", data)
  }

  create(title: string): Promise<XMLHttpRequest> {
    return this.request.post("", { title })
  }

  delete(chatId: number): Promise<XMLHttpRequest> {
    return this.request.delete("", { chatId })
  }

  addUsers(data: IChatsUsersModifyRequest): Promise<XMLHttpRequest> {
    return this.request.put("/users", data)
  }

  deleteUsers(data: IChatsUsersModifyRequest): Promise<XMLHttpRequest> {
    return this.request.delete("/users", data)
  }

  updateAvatar(data: FormData): Promise<XMLHttpRequest> {
    const options: IRequestOptions = {
      headers: {}
    }
    return this.request.put("/avatar", data, options)
  }

  getUsers(data: IChatsGetUsers): Promise<XMLHttpRequest> {
    return this.request.get(`/${data.id}/users`, data)
  }

  getToken(id: number): Promise<XMLHttpRequest> {
    return this.request.post(`/token/${id}`, { id })
  }
}

export default new ChatsAPI()

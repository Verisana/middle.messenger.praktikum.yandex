import { IChatsResponse, ISocketMessageResponse, UserData } from "./api"

export interface IStoreData {
    user?: UserData
    chats?: IChatsResponse[]
    messages?: ISocketMessageResponse[]
    chatsSearchQuery?: string
    usersInChat?: UserData[]
    selectedChat?: IChatsResponse
}

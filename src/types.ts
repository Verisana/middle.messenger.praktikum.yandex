import { IChatsResponse, IMessageResponse, UserData } from "./api/types"

export interface IStoreData {
    user?: UserData
    chats?: IChatsResponse[]
    messages?: IMessageResponse[]
    chatsSearchQuery?: string
}

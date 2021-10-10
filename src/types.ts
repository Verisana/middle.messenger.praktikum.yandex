import { IChatsResponse, IMessageResponse, UserData } from "./api/types"
import { SideChat } from "./modules/sideChat"

export interface IStoreData {
    user?: UserData
    chats?: IChatsResponse[]
    messages?: IMessageResponse[]
    chatsSearchQuery?: string
    usersInChat?: UserData[]
    selectedChat?: SideChat
}

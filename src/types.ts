import { IChatsResponse, ISocketMessageResponse, UserData } from "./api/types"
import { SideChat } from "./modules/sideChat"

export interface IStoreData {
    user?: UserData
    chats?: IChatsResponse[]
    messages?: ISocketMessageResponse[]
    chatsSearchQuery?: string
    usersInChat?: UserData[]
    selectedChat?: SideChat
}

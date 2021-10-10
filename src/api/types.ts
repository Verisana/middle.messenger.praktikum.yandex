import { RequestData } from "../utils/types"

export interface IBadRequest {
    reason: string
}

export interface UserData {
    id: string
    login: string
    first_name: string
    second_name: string
    display_name: string
    email: string
    phone: string
    avatar: string
}

export interface IRegisterRequest extends RequestData {
    login: string
    password: string
    first_name: string
    second_name: string
    email: string
    phone: string
}

export interface ILoginRequest extends RequestData {
    login: string
    password: string
}

export interface IProfileUpdateRequest extends RequestData {
    login: string
    first_name: string
    second_name: string
    display_name: string
    email: string
    phone: string
}

export interface IProfilePasswordUpdateRequest extends RequestData {
    oldPassword: string
    newPassword: string
}

export interface IChatsRequest extends RequestData {
    offset: number
    limit: number
    title: string
}

export type IChatsResponse = {
    id: string
    avatar: string
    title: string
    unread_count: number
    last_message: {
        user: Omit<UserData, "id" | "display_name">
        time: string
        timeHuman: string
        content: string
    } | null
}

export interface IChatsDeleteResponse {
    userId: number
    result: {
        id: string
        avatar: string
        title: string
    }
}

export interface IChatsUsersModifyRequest extends RequestData {
    users: number[]
    chatId: number
}

export interface IChatsGetUsers extends RequestData {
    id: number
    offset: number
    limit: number
    name: string
    email: string
}

export interface IChatsAvatarRequest extends RequestData {
    chatId: number
    avatar: FormData
}

export interface IWebSocketSend {
    content: string
    type: string
}

export interface ISocketMessageResponse {
    chat_id: number
    content: string
    file: null
    id: number
    is_read: boolean
    time: string
    type: string
    user_id: number
    timeHuman?: string
}

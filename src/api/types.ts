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

export interface ILoginRequest {
    login: string
    password: string
}

export type ProfileUpdateRequest = Omit<IRegisterRequest, "password"> & {
    display_name: string
}

export interface IProfilePasswordUpdateRequest {
    oldPassword: string
    newPassword: string
}

export interface IChatsRequest {
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
        content: string
    }
}

export interface IChatsDeleteRequest {
    chatId: string
}

export interface IChatsDeleteResponse {
    userId: number
    result: {
        id: string
        avatar: string
        title: string
    }
}

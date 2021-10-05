export interface IBadRequestResponse {
    reason: string
}

export interface Id {
    id: string
}

export interface ILogin {
    login: string
}

export interface IAvatar {
    avatar: string
}

export interface ITitle {
    title: string
}

export interface IRegisterRequest extends ILogin {
    password: string
    first_name: string
    second_name: string
    email: string
    phone: string
}

export interface ILoginRequest
    extends Omit<
        IRegisterRequest,
        "first_name" | "second_name" | "email" | "phone"
    > {}

export type UserResponse = Omit<IRegisterRequest, "password"> &
    Id &
    IAvatar & {
        display_name: string
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

export type IChatsResponse = Id &
    IAvatar & {
        title: string
        unread_count: number
        last_message: {
            user: Omit<UserResponse, "id" | "display_name">
            time: string
            content: string
        }
    }

export interface IChatsDeleteRequest {
    chatId: string
}

export interface IChatsDeleteResponse {
    userId: number
    result: Id & IAvatar & ITitle
}

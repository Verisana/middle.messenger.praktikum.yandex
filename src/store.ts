import { UserData, ISocketMessageResponse, IChatsResponse } from "./api"
import { BlockEvents } from "./consts"
import { IStoreData } from "./types"
import { EventBus } from "./utils/event_bus"
import { PlainObject } from "./utils/types"
import { get, normalizeAvatar, set } from "./utils/utils"

export class Store {
    static __instance: Store

    // @ts-expect-error
    private _data: IStoreData

    // @ts-expect-error
    eventBus: () => EventBus

    constructor(data: IStoreData) {
        const eventBus = new EventBus()

        if (Store.__instance) {
            return Store.__instance
        }
        this._data = data
        this.eventBus = () => eventBus

        Store.__instance = this
    }

    get data(): IStoreData {
        return this._data
    }

    select(path: string): PlainObject | undefined {
        return get(this.data, path, false)
    }

    setUser(user: UserData): boolean {
        user.avatar = normalizeAvatar(user.avatar)
        return this.setValue("user", user)
    }

    setUsersInChat(users: UserData[]): boolean {
        for (const user of users) {
            user.avatar = normalizeAvatar(user.avatar)
        }
        return this.setValue("usersInChat", users)
    }

    setChats(chats: IChatsResponse[]): boolean {
        for (const chat of chats) {
            chat.avatar = normalizeAvatar(chat.avatar)
            if (chat.last_message !== null) {
                chat.last_message.user.avatar = normalizeAvatar(
                    chat.last_message.user.avatar
                )
                const date = new Date(chat.last_message.time)
                chat.last_message.timeHuman = Intl.DateTimeFormat("ru-RU", {
                    hour: "numeric",
                    minute: "numeric"
                }).format(date)
            }
        }

        return this.setValue("chats", chats)
    }

    setMessages(messages: ISocketMessageResponse[]): boolean {
        for (const message of messages) {
            const date = new Date(message.time)
            message.timeHuman = Intl.DateTimeFormat("ru-RU", {
                hour: "numeric",
                minute: "numeric"
            }).format(date)
        }

        return this.setValue("messages", messages)
    }

    setValue(path: string, value: unknown): boolean {
        set(this.data, path, value)
        this.eventBus().emit(BlockEvents.STATE_SDU, path, value)
        return true
    }

    setUndefined(path: string): boolean {
        set(this.data, path, undefined)
        return true
    }
}

export const store = new Store({})

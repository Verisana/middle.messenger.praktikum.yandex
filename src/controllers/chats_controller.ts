import { ChatsAPI } from "../api"
import {
    IChatsCreateRequest,
    IChatsDeleteRequest,
    IChatsRequest,
    IChatsResponse,
    IChatsUsersModifyRequest
} from "../api/types"
import { Message } from "../components/message"
import { TimeInfo } from "../components/timeInfo"
import { maxMessageLength } from "../consts"
import { SideChat } from "../modules/sideChat"
import { routerFactory } from "../router"
import { store } from "../store"

const router = routerFactory()

class ChatsController {
    private api: ChatsAPI

    constructor() {
        this.api = new ChatsAPI()
    }

    private _createSideChat(chat: IChatsResponse, index: number): SideChat {
        if (chat.last_message === null) {
            chat.last_message = {
                user: {
                    login: "",
                    first_name: "",
                    second_name: "",
                    email: "",
                    phone: "",
                    avatar: ""
                },
                time: "",
                timeHuman: "",
                content: ""
            }
        }

        return new SideChat({
            storeMappings: {
                [`chats.${index}.avatar`]: ["avatarSrc"],
                [`chats.${index}.title`]: ["chatTitle"],
                [`chats.${index}.id`]: ["chatId"],
                [`chats.${index}.last_message.user.login`]: [
                    "Message.props.senderName"
                ],
                [`chats.${index}.last_message.content`]: ["Message.props.text"],
                [`chats.${index}.last_message.time`]: [
                    "Time.props.timeMachine"
                ],
                [`chats.${index}.last_message.timeHuman`]: [
                    "Time.props.timeHuman"
                ]
            },
            props: {
                avatarSrc: chat.avatar,
                chatTitle: chat.title,
                chatId: Number(chat.id),
                Message: new Message({
                    settings: { maxTextLength: maxMessageLength },
                    props: {
                        senderName: chat.last_message.user.login,
                        text: chat.last_message.content,
                        rootClass: ["message__sidebar"]
                    }
                }),
                Time: new TimeInfo({
                    props: {
                        timeMachine: chat.last_message.time,
                        timeHuman: chat.last_message.timeHuman,
                        rootClass: ["time-info__chat-side-bar"]
                    }
                })
            }
        })
    }

    private _constructSideChats(): SideChat[] {
        const result: SideChat[] = []
        const chats = store.select("chats") as IChatsResponse[] | undefined
        if (chats !== undefined && chats.length > 0) {
            chats.forEach((chat: IChatsResponse, index: number) => {
                const sideChat = this._createSideChat(chat, index)
                result.push(sideChat)
            })
        }
        return result
    }

    async get(data?: IChatsRequest) {
        try {
            const response = await this.api.get(data)
            store.setChats(response.response)
            const sideChats = this._constructSideChats()

            // Надо было, видимо, сделать правильное наследование типов, иначе
            // теперь приходится any затыкать
            const { page } = router as any
            page.props.Content.props.SideChatBar.props.SideChats = sideChats
        } catch (e) {
            console.log(e)
        }
    }

    async create(data: IChatsCreateRequest) {
        try {
            await this.api.create(data)
            await this.get()
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

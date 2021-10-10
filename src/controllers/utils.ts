import { IChatsResponse, ISocketMessageResponse, UserData } from "../api"
import { Message } from "../components/message"
import { TimeInfo } from "../components/timeInfo"
import { maxMessageLength } from "../consts"
import { SideChat } from "../modules/sideChat"
import { store } from "../store"
import { isFormDataValid } from "../utils/validators"

export function submitControllerBuilder(controllerMethod: Function) {
    return async (event: Event) => {
        event.preventDefault()
        const form = event.target as HTMLFormElement
        // Не вижу смысла в этой валидации, но раз в задании есть, добавил
        if (isFormDataValid(form)) {
            const data = new FormData(form)
            await controllerMethod(data)
            form.reset()
        }
    }
}

export function createSideChat(chat: IChatsResponse, index: number): SideChat {
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
            [`chats.${index}.last_message.time`]: ["Time.props.timeMachine"],
            [`chats.${index}.last_message.timeHuman`]: ["Time.props.timeHuman"]
        },
        props: {
            value: index,
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

export function constructSideChats(): SideChat[] {
    const result: SideChat[] = []
    const chats = store.select("chats") as IChatsResponse[] | undefined
    if (chats !== undefined && chats.length > 0) {
        chats.forEach((chat: IChatsResponse, index: number) => {
            const sideChat = createSideChat(chat, index)
            result.push(sideChat)
        })
    }
    return result
}

export function createMessage(
    message: ISocketMessageResponse,
    users: UserData[]
): Message {
    const user = store.select("user") as UserData | undefined
    if (user === undefined) throw new Error("User must be defined")

    let sender: UserData
    let isOwner: boolean = false
    if (Number(user.id) === Number(message.user_id)) {
        sender = user
        isOwner = true
    } else {
        // eslint-disable-next-line
        sender = users.filter((user) => {
            return Number(user.id) === Number(message.user_id)
        })[0]
    }

    return new Message({
        props: {
            senderName: sender.login,
            text: message.content,
            senderId: Number(sender.id),
            rootClass: isOwner
                ? ["message__open", "message__open_right"]
                : ["message__open", "message__open_left"],
            Time: new TimeInfo({
                props: {
                    timeMachine: message.time,
                    timeHuman: message.timeHuman,
                    rootClass: ["time-info__open"]
                }
            })
        }
    })
}

export function constructMessages(): Message[] {
    const result: Message[] = []
    const messages = store.select("messages") as
        | ISocketMessageResponse[]
        | undefined
    const chatUsers = store.select("usersInChat") as UserData[] | undefined
    if (chatUsers === undefined) throw new Error("Users must be already set")

    if (messages !== undefined && messages.length > 0) {
        messages.forEach((messageReceived) => {
            const message = createMessage(messageReceived, chatUsers)
            result.push(message)
        })
    }
    return result
}

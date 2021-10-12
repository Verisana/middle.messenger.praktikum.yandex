import chatsController from "./chats_controller"
import { MessagesAPI, UserData, ISocketMessageResponse } from "../api"
import { SideChat } from "../modules/sideChat"
import { store } from "../store"
import { globalEvents, inputFieldNames } from "../consts"
import { globalEventBus } from "../utils/event_bus"
import { constructMessages } from "./utils"
import { routerFactory } from "../router"
import { Layout } from "../layout"
import { IMessengerPageProps } from "../pages/messenger"
import { pingInterval } from "./consts"

enum PingStatus {
    DISCONNECTED,
    CONNECTED
}

const router = routerFactory()

export class MessagesController {
    static EVENTS: {}

    private api?: MessagesAPI

    private selected?: SideChat

    constructor() {
        globalEventBus().on(globalEvents.PING_STATUS, (status: number) => {
            if (status === PingStatus.CONNECTED) {
                this.ping()
            }
        })
        globalEventBus().on(
            globalEvents.OLD_MESSAGES,
            this.onOldMessagesReceived.bind(this)
        )
        globalEventBus().on(
            globalEvents.NEW_MESSAGE,
            this.onNewMessageReceived.bind(this)
        )
    }

    onOldMessagesReceived(messages: ISocketMessageResponse[]) {
        store.setMessages(messages.reverse())
        const messageComponents = constructMessages()
        const messengerPageProps = (
            router.page as unknown as Layout<IMessengerPageProps>
        ).props.Content.props
        messengerPageProps.Messages = messageComponents
    }

    onNewMessageReceived(message: ISocketMessageResponse) {
        let messages = store.select("messages") as
            | ISocketMessageResponse[]
            | undefined
        if (messages !== undefined) {
            messages.push(message)
        } else {
            messages = [message]
        }
        store.setMessages(messages)
        const messageComponents = constructMessages()
        const messengerPageProps = (
            router.page as unknown as Layout<IMessengerPageProps>
        ).props.Content.props
        messengerPageProps.Messages = messageComponents
    }

    onOpenHandler() {
        console.log("Соединение установлено")
        this.requestMessages()
        this.ping()
    }

    async onCloseHandler(event: CloseEvent) {
        if (event.wasClean) {
            console.log("Соединение закрыто чисто")
        } else {
            console.log("Обрыв соединения. Пробуем переподключиться")
            await this.open()
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`)
    }

    onMessageHandler(event: MessageEvent) {
        const message = JSON.parse(event.data)
        if (Array.isArray(message)) {
            globalEventBus().emit(globalEvents.OLD_MESSAGES, message)
        } else if (message.type === "message") {
            globalEventBus().emit(globalEvents.NEW_MESSAGE, message)
        } else {
            console.log(message)
        }
    }

    onErrorHandler(event: ErrorEvent) {
        console.log("Ошибка", event.message)
    }

    async open(selected?: SideChat) {
        this.close()

        // Используем this.selected, чтобы закешировать параметры последнего вызова
        // и переподключить соединение
        if (selected !== undefined) {
            this.selected = selected
        }

        if (this.selected === undefined) {
            throw new Error(
                "Can not open connection if no SideChat was selected"
            )
        }
        const user = store.select("user") as UserData | undefined
        if (user === undefined) throw new Error("User must be authorized")

        const token = await chatsController.getToken(this.selected.props.chatId)

        if (token === undefined) {
            console.log("Can not receive token. Connection has not been opened")
            return
        }
        this.api = new MessagesAPI(
            Number(user.id),
            this.selected.props.chatId,
            token,
            {
                onOpen: this.onOpenHandler.bind(this),
                onClose: this.onCloseHandler.bind(this),
                onMessage: this.onMessageHandler.bind(this),
                onError: this.onErrorHandler.bind(this)
            }
        )
    }

    close() {
        try {
            if (this.api !== undefined) {
                this.api.close()
                this.api = undefined
            }
        } catch (e) {
            console.log(e)
        }
    }

    async requestMessages() {
        try {
            if (this.api !== undefined) {
                const selected = store.select("selectedChat") as
                    | SideChat
                    | undefined
                if (selected !== undefined) {
                    await chatsController.readUsers(selected.props.chatId)
                    this.api.requestMessages(0)
                } else {
                    throw new Error(
                        "Chat must be selected before requesting messages"
                    )
                }
            } else {
                throw new Error(
                    "You must open new connection to use this socket"
                )
            }
        } catch (e) {
            console.log(e)
        }
    }

    sendMessage(data: FormData) {
        try {
            if (this.api !== undefined) {
                const message = data.get(inputFieldNames.message) as
                    | string
                    | null
                if (message !== null) {
                    this.api.sendMessage(message)
                }
                this.requestMessages()
            } else {
                throw new Error(
                    "You must open new connection to use this socket"
                )
            }
        } catch (e) {
            console.log(e)
        }
    }

    ping() {
        setTimeout(() => {
            try {
                this.api?.ping()
                globalEventBus().emit(
                    globalEvents.PING_STATUS,
                    PingStatus.CONNECTED
                )
            } catch (e) {
                globalEventBus().emit(
                    globalEvents.PING_STATUS,
                    PingStatus.DISCONNECTED
                )
            }
        }, pingInterval)
    }
}

export default new MessagesController()

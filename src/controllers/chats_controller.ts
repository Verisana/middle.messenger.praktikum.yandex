import usersController from "./users_controller"
import { ChatsAPI, UserData } from "../api"
import { IChatsGetUsers, IChatsRequest } from "../api/types"
import { IMessageProps } from "../components/message"
import { ILayoutProps } from "../layout"
import { ISideChatProps, SideChat } from "../modules/sideChat"
import { ISideChatBarProps } from "../modules/sideChatBar"
import { IMessengerPageProps } from "../pages/messenger"
import { getSelectedSideChat } from "../pages/messenger/utils"
import { routerFactory } from "../router"
import { store } from "../store"
import { constructSideChats } from "./utils"

const router = routerFactory()

class ChatsController {
    private api: ChatsAPI

    constructor() {
        this.api = new ChatsAPI()
    }

    async get(data?: IChatsRequest) {
        try {
            const response = await this.api.get(data)
            store.setChats(response.response)
            let sideChats = constructSideChats()
            const searchQuery = store.select("chatsSearchQuery") as
                | string
                | undefined

            if (searchQuery !== undefined) {
                sideChats = sideChats.filter((value) => {
                    const props = value.props as ISideChatProps
                    const messageProps = props.Message.props as IMessageProps
                    return (
                        props.chatTitle.includes(searchQuery) ||
                        String(props.chatId).includes(searchQuery) ||
                        messageProps.text.includes(searchQuery)
                    )
                })
                store.setUndefined("chatsSearchQuery")
            }

            // Надо было, видимо, сделать правильное наследование типов, иначе
            // теперь приходится any затыкать
            const { page } = router as any
            page.props.Content.props.SideChatBar.props.SideChats = sideChats
        } catch (e) {
            console.log(e)
        }
    }

    async create(title: string) {
        try {
            const { chats } = store.data
            if (chats !== undefined) {
                const duplicate = chats.filter((chat) => {
                    return chat.title === title
                })
                if (duplicate.length > 0) {
                    alert("Нельзя создавать чаты с одинаковыми именами")
                    return
                }
                await this.api.create(title)
                await this.get()
            }
        } catch (e) {
            console.log(e)
        }
    }

    async delete(selected: SideChat) {
        try {
            const props = selected.props as ISideChatProps
            if (
                // eslint-disable-next-line
                confirm(
                    `Вы действительно хотите удалить ${props.chatTitle} чат?`
                )
            ) {
                await this.api.delete(props.chatId)
                await this.get()
            }
        } catch (e) {
            console.log(e)
        }
    }

    private async _modifyUsers(
        login: string,
        selected?: SideChat,
        isDelete: boolean = false
    ) {
        try {
            if (selected !== undefined) {
                const sideChatProps = selected.props as ISideChatProps
                const allUsers = await this.readUsers(sideChatProps.chatId)

                const duplicateUsers = allUsers.filter((value) => {
                    if (value.login === login) {
                        return true
                    }
                    return false
                })

                if (isDelete) {
                    if (duplicateUsers.length === 0) {
                        alert(
                            `Пользователя ${login} нет в чате или вы пытаетесь удалить себя`
                        )
                        return
                    }
                } else {
                    // eslint-disable-next-line
                    if (duplicateUsers.length > 0) {
                        alert(`Пользователь ${login} уже добавлен`)
                        return
                    }
                }
                const user = await usersController.searchUser(login)
                if (user !== undefined) {
                    if (isDelete) {
                        await this.api.deleteUsers({
                            chatId: sideChatProps.chatId,
                            users: [Number(user.id)]
                        })
                        alert(
                            `Пользователь ${user.login} удален из чата ${sideChatProps.chatTitle}`
                        )
                    } else {
                        await this.api.addUsers({
                            chatId: sideChatProps.chatId,
                            users: [Number(user.id)]
                        })
                        alert(
                            `Пользователь ${user.login} добавлен в чат ${sideChatProps.chatTitle}`
                        )
                    }
                } else {
                    alert(`Пользователь ${login} не найден`)
                }
            } else {
                alert("Для работы этой кнопки необходимо выбрать чат")
            }
        } catch (e) {
            if (isDelete) {
                alert(`Ошибка. Пользователь ${login} не удален`)
            } else {
                alert(`Ошибка. Пользователь ${login} не добавлен`)
            }
            console.log(e)
        }
    }

    async addUsers(login: string, selected?: SideChat) {
        await this._modifyUsers(login, selected, false)
    }

    async deleteUsers(login: string, selected?: SideChat) {
        await this._modifyUsers(login, selected, true)
    }

    async updateAvatar(formData: FormData) {
        try {
            const sidebarProps = (
                (router.page.props as ILayoutProps).Content
                    .props as IMessengerPageProps
            ).SideChatBar.props as ISideChatBarProps

            const selected = getSelectedSideChat(sidebarProps.SideChats)
            if (selected !== undefined) {
                const sideChatProps = selected.props as ISideChatProps
                formData.append("chatId", String(sideChatProps.chatId))
                await this.api.updateAvatar(formData)
                await this.get()
            } else {
                alert("Чтобы установить аватар, надо сначала выбрать чат")
            }
        } catch (e) {
            alert("Ошибка. Аватар не обновлен")
            console.log(e)
        }
    }

    async getUsers(data: IChatsGetUsers): Promise<UserData[]> {
        try {
            const response = await this.api.getUsers(data)
            return response.response
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async readUsers(chatId: number): Promise<UserData[]> {
        try {
            const users = await this.getUsers({
                id: chatId,
                offset: 0,
                limit: 100,
                name: "",
                email: ""
            })
            store.setUsersInChat(users)
            return users
        } catch (e) {
            console.log(e)
            return []
        }
    }

    async showUsersInChat(selected?: SideChat): Promise<undefined> {
        try {
            if (selected !== undefined) {
                const sideChatProps = selected.props as ISideChatProps
                const allUsers = await this.readUsers(sideChatProps.chatId)

                let info = `В чате ${sideChatProps.chatTitle} участвуют пользователи в количестве ${allUsers.length}:\n`

                for (const user of allUsers) {
                    info += `${user.login}\n`
                }
                alert(info)
            } else {
                alert("Для показа пользователей нужно сначала выбрать чат")
            }
        } catch (e) {
            console.log(e)
            alert(`Ошибка. Не удалось получить пользователей`)
        }
        return undefined
    }

    async getToken(chatId: number): Promise<string | undefined> {
        try {
            const response = await this.api.getToken(chatId)
            return response.response.token
        } catch (e) {
            console.log(e)
            return undefined
        }
    }
}

export default new ChatsController()

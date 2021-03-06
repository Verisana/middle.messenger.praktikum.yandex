import usersController from "./users_controller"
import {
  ChatsAPI,
  UserData,
  IChatsGetUsers,
  IChatsRequest,
  IChatsResponse
} from "../api"
import { Layout } from "../layout"
import { IMessengerPageProps } from "../pages/messenger"
import { getSelectedSideChat } from "../modules/sideChat"
import { routerFactory } from "../router"
import { store } from "../store"
import { globalEventBus } from "../utils/event_bus"
import { globalEvents } from "../consts"

const router = routerFactory()

class ChatsController {
  private api: typeof ChatsAPI

  constructor() {
    this.api = ChatsAPI
  }

  async get(data?: IChatsRequest) {
    try {
      const response = await this.api.get(data)
      store.setChats(response.response)
      globalEventBus().emit(globalEvents.sideChatsUpdated)
    } catch (e) {
      console.log(e)
    }
  }

  async create(title: string) {
    try {
      await this.api.create(title)
      await this.get()
    } catch (e) {
      console.log(e)
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id)
      await this.get()
      store.setMessages([])
    } catch (e) {
      console.log(e)
    }
  }

  private async _modifyUsers(
    login: string,
    selected?: IChatsResponse,
    isDelete: boolean = false
  ) {
    try {
      if (selected !== undefined) {
        const allUsers = await this.readUsers(Number(selected.id))

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
              chatId: Number(selected.id),
              users: [Number(user.id)]
            })
            alert(`Пользователь ${user.login} удален из чата ${selected.title}`)
          } else {
            await this.api.addUsers({
              chatId: Number(selected.id),
              users: [Number(user.id)]
            })
            alert(`Пользователь ${user.login} добавлен в чат ${selected.title}`)
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

  async addUsers(login: string, selected?: IChatsResponse) {
    await this._modifyUsers(login, selected, false)
  }

  async deleteUsers(login: string, selected?: IChatsResponse) {
    await this._modifyUsers(login, selected, true)
  }

  async updateAvatar(formData: FormData) {
    try {
      const sidebarProps = (
        router.page as unknown as Layout<IMessengerPageProps>
      ).props.Content.props.SideChatBar.props

      const selected = getSelectedSideChat(sidebarProps.SideChats)
      if (selected !== undefined) {
        formData.append("chatId", String(selected.id))
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

  async showUsersInChat(selected?: IChatsResponse): Promise<undefined> {
    try {
      if (selected !== undefined) {
        const allUsers = await this.readUsers(Number(selected.id))

        let info = `В чате ${selected.title} участвуют пользователи в количестве ${allUsers.length}:\n`

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

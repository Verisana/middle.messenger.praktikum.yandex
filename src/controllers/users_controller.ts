import {
    UsersAPI,
    IProfilePasswordUpdateRequest,
    UserData,
    IProfileUpdateRequest
} from "../api"
import { store } from "../store"

class UsersController {
    private api: UsersAPI

    constructor() {
        this.api = new UsersAPI()
    }

    async updateProfile(formData: FormData) {
        try {
            const data: IProfileUpdateRequest = {
                first_name: String(formData.get("first_name")),
                second_name: String(formData.get("second_name")),
                display_name: String(formData.get("display_name")),
                login: String(formData.get("login")),
                email: String(formData.get("email")),
                phone: String(formData.get("phone"))
            }
            const response = await this.api.updateProfile(data)
            store.setUser(response.response)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    async updateAvatar(formData: FormData) {
        try {
            const response = await this.api.updateAvatar(formData)
            store.setUser(response.response)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    async updatePassword(formData: FormData) {
        try {
            const data: IProfilePasswordUpdateRequest = {
                oldPassword: String(formData.get("oldPassword")),
                newPassword: String(formData.get("newPassword"))
            }
            await this.api.updatePassword(data)
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    }

    async searchUser(login: string): Promise<UserData | undefined> {
        try {
            const response = await this.api.search(login)
            const user = (response.response as UserData[]).filter((value) => {
                return value.login === login
            })
            if (user.length > 1) {
                throw new Error(
                    "Found more than one user. This case is not handled"
                )
            }
            return user.length === 1 ? user[0] : undefined
        } catch (e) {
            console.log(e)
            return undefined
        }
    }
}

export default new UsersController()

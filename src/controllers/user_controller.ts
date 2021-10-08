import { UserAPI, IProfilePasswordUpdateRequest } from "../api"
import { IProfileUpdateRequest } from "../api/types"
import { urlSlugs } from "../consts"
import { routerFactory } from "../router"
import { store } from "../store"

const router = routerFactory()

class UserController {
    private api: UserAPI

    constructor() {
        this.api = new UserAPI()
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
            store.setValue("user", response.response)
        } catch (e) {
            console.log(e)
        }
    }

    async updateAvatar(formData: FormData) {
        try {
            const data = formData.get("avatar")
            const response = await this.api.updateAvatar(data)
            store.setValue("user", response.response)
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
            router.go(urlSlugs.settings)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new UserController()

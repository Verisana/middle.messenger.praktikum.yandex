import { AuthAPI, IRegisterRequest } from "../api"
import { urlSlugs } from "../consts"
import { routerFactory } from "../router"
import { store } from "../store"

const router = routerFactory()

class AuthController {
    private api: AuthAPI

    constructor() {
        this.api = new AuthAPI()
    }

    async register(formData: FormData) {
        try {
            const data: IRegisterRequest = {
                first_name: String(formData.get("first_name")),
                second_name: String(formData.get("second_name")),
                login: String(formData.get("login")),
                password: String(formData.get("password")),
                email: String(formData.get("email")),
                phone: String(formData.get("phone"))
            }
            await this.api.register(data)
            await this.userRead()
            router.go(urlSlugs.home)
        } catch (e) {
            console.log(e)
        }
    }

    async userRead() {
        try {
            const response = await this.api.userRead()
            store.setValue("user", response.response)
        } catch (e) {
            store.setUndefined("user")
        }
    }
}

export default new AuthController()

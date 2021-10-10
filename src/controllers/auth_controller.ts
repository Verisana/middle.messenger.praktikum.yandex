import { AuthAPI, ILoginRequest, IRegisterRequest } from "../api"
import { urlSlugs } from "../consts"
import { routerFactory } from "../router"
import { store } from "../store"

const router = routerFactory()

class AuthController {
    private api: AuthAPI

    constructor() {
        this.api = new AuthAPI()
    }

    async login(formData: FormData) {
        try {
            const data: ILoginRequest = {
                login: String(formData.get("login")),
                password: String(formData.get("password"))
            }
            await this.api.login(data)
            await this.userRead()
            router.go(urlSlugs.home)
        } catch (e) {
            // Здесь нельзя импортировать тип LoginPage, иначе получается циклический импорт
            // поэтому проставил тип any. Как это сделать более правильно?
            const loginPage = router.page.props.Content as any
            const loginPageProps = loginPage.props
            loginPageProps.LoginSubmitForm.showError()
        }
    }

    async logout() {
        try {
            await this.api.logout()
            await this.userRead()
            router.go(urlSlugs.home)
        } catch (e) {
            await this.userRead()
        }
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
            store.setUser(response.response)
        } catch (e) {
            store.setUndefined("user")
        }
    }
}

export default new AuthController()

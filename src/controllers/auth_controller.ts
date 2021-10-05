import { AuthAPI, IRegisterRequest } from "../api"

class AuthController {
    private api: AuthAPI

    constructor() {
        this.api = new AuthAPI()
    }

    async register(data: IRegisterRequest) {
        try {
            const response = await this.api.register(data)
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }
}

export default new AuthController()

import { BaseAPI } from "./base_api"
import { ILoginRequest, IRegisterRequest } from "./types"

class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth")
  }

  login(data: ILoginRequest): Promise<XMLHttpRequest> {
    return this.request.post("/signin", data)
  }

  register(data: IRegisterRequest): Promise<XMLHttpRequest> {
    return this.request.post("/signup", data)
  }

  logout(): Promise<XMLHttpRequest> {
    return this.request.post("/logout")
  }

  userRead(): Promise<XMLHttpRequest> {
    return this.request.get("/user")
  }
}

export default new AuthAPI()

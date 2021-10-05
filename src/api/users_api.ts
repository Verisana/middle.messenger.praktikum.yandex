import { BaseAPI } from "./base_api"

export class UserAPI extends BaseAPI {
    constructor() {
        super("/user")
    }

    profileUpdate() {}

    passwordUpdate() {}

    avatarUpdate() {}

    userGet() {}

    userSearch() {}
}

import { homeContent } from "./home"
import { errorContent } from "./errors/404"
import { serverErrorContent } from "./errors/500"
import { loginContent } from "./auth/login"
import { registerContent } from "./auth/register"
import { settingsContent } from "./settings"

export const pages = {
    homeContent,
    loginContent,
    registerContent,
    settingsContent,
    errorContent,
    serverErrorContent
}

import { homeContent } from "./home"
import { errorContent } from "./errors/404"
import { serverErrorContent } from "./errors/500"
import { loginContent } from "./auth/login"
import { registerContent } from "./auth/register"
import { settingsContent } from "./settings"

const pages = {
    homeContent: homeContent,
    loginContent: loginContent,
    registerContent: registerContent,
    settingsContent: settingsContent,
    errorContent: errorContent,
    serverErrorContent: serverErrorContent
}

export { pages }

import { homeContent } from "./home/index.js"
import { errorContent } from "./errors/404/index.js"
import { serverErrorContent } from "./errors/500/index.js"
import { loginContent } from "./auth/login/index.js"
import { registerContent } from "./auth/register/index.js"
import { settingsContent } from "./settings/index.js"

const pages = {
    homeContent: homeContent,
    loginContent: loginContent,
    registerContent: registerContent,
    settingsContent: settingsContent,
    errorContent: errorContent,
    serverErrorContent: serverErrorContent
}

export { pages }

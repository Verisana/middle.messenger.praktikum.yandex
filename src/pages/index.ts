import { HomePage } from "./home"
import { ErrorPage } from "./errors/404"
import { serverErrorContent } from "./errors/500"
import { loginContent } from "./auth/login"
import { registerContent } from "./auth/register"
import { settingsContent } from "./settings"

export const pages = {
    home: () => new HomePage(),
    loginContent,
    registerContent,
    settingsContent,
    error: () => new ErrorPage(),
    serverErrorContent
}

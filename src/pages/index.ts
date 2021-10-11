import { MessengerPage } from "./messenger"
import { ErrorPage } from "./errors/404"
import { ServerErrorPage } from "./errors/500"
import { LoginPage } from "./auth/login"
import { RegisterPage } from "./auth/register"
import { SettingsPage } from "./settings"
import { Block } from "../components/block"

export const pages: Record<string, () => Block> = {
    login: () => new LoginPage(),
    register: () => new RegisterPage(),
    messenger: () => new MessengerPage(),
    profileSettings: () => new SettingsPage(),
    error: () => new ErrorPage(),
    serverError: () => new ServerErrorPage()
}

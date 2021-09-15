import { HomePage } from "./home"
import { ErrorPage } from "./errors/404"
import { ServerErrorPage } from "./errors/500"
import { LoginPage } from "./auth/login"
import { RegisterPage } from "./auth/register"
import { SettingsPage } from "./settings"
import { Block } from "../components/block"

export const pages: Record<string, () => Block> = {
    home: () => new HomePage(),
    login: () => new LoginPage(),
    register: () => new RegisterPage(),
    profileSettings: () => new SettingsPage(),
    error: () => new ErrorPage(),
    serverError: () => new ServerErrorPage()
}

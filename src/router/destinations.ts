import { Block } from "../block"
import { pages } from "../pages"

export const DESTINATIONS: {
    [key: string]: () => Block
} = {
    error: pages.error,
    serverError: pages.serverErrorContent,
    home: pages.home,
    login: pages.loginContent,
    register: pages.registerContent,
    profileSettings: pages.settingsContent
}

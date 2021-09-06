import { pages } from "../pages"

export const DESTINATIONS: {
    [key: string]: () => Element
} = {
    error: pages.errorContent,
    serverError: pages.serverErrorContent,
    home: pages.homeContent,
    login: pages.loginContent,
    register: pages.registerContent,
    profileSettings: pages.settingsContent
}

import { pages } from "../pages"
import { renderContent } from "../layout/layout.js"

// Пока мы не дошли до роутинга, чтобы не плодить лишние html файлы, которые
// меня печалят, решил использовать эту заглушку, чтобы отображать страницы

const DESTINATIONS = {
    error: pages.errorContent,
    serverError: pages.serverErrorContent,
    home: pages.homeContent,
    login: pages.loginContent,
    register: pages.registerContent,
    profileSettings: pages.settingsContent
}

export const switchContent = (location) => {
    const content = DESTINATIONS[location]
    if (content === undefined) {
        throw new Error("Passed wrong destination. Check your code")
    }
    renderContent(content)
}

import headerTemplate from "./header.hbs"
import { string2DomElement } from "../../utils/utils.js"
import { linkButtons } from "../../router/tempButtons.js"
import { button } from "../button/index.js"
import { isLogged } from "../../consts.js"

export const placeholders = {
    menuButton: "header-menu-button",
    settingsButton: "header-menu-settings",
}

export const header = () => {
    const params = {
        isLogged,
        ...placeholders
    }
    const header_ = string2DomElement(headerTemplate(params))

    if (isLogged) {
        const menuButtonDiv = header_.querySelector(
            `#${placeholders.menuButton}`
        )
        menuButtonDiv.appendChild(button({ imgSrc: "menu_white_48dp.svg" }))
        const settingsButtonDiv = header_.querySelector(
            `#${placeholders.settingsButton}`
        )
        settingsButtonDiv.appendChild(
            linkButtons.profileSettings({ imgSrc: "settings_white_48dp.svg" })
        )
    }

    return header_
}

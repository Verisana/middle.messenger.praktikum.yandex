import headerTemplate from "./header.hbs"
import { string2DomElement } from "../../utils/utils.js"
import { linkButtons } from "../../router/tempButtons.js"
import { button } from "../button/index.js"

export const placeholders = {
    menuButton: "header-menu-button",
    settingsButton: "header-menu-settings",
    buttonToLogin: "header-button-to-login",
    buttonToRegister: "header-button-to-register"
}

export const header = (isLogged) => {
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
    } else {
        const buttonToLoginDiv = header_.querySelector(
            `#${placeholders.buttonToLogin}`
        )
        buttonToLoginDiv.appendChild(linkButtons.login({ text: "Залогиниться" }))
        const buttonToRegisterDiv = header_.querySelector(
            `#${placeholders.buttonToRegister}`
        )
        buttonToRegisterDiv.appendChild(
            linkButtons.register({ text: "Зарегистрироваться" })
        )
    }
    return header_
}

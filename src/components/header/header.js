import styles from "./header.css"
import headerTemplate from "./header.hbs"
import { string2DomElement } from "../../utils/utils.js"
import { linkButtons } from "../../router/tempButtons.js"
import { button } from "../button"
import { isLogged } from "../../consts.js"

export const placeholders = {
    menuButton: "header-menu-button",
    settingsButton: "header-menu-settings"
}

export const header = () => {
    const params = {
        isLogged,
        logoStyles: styles.logo__style_default,
        ...placeholders
    }
    const header_ = string2DomElement(headerTemplate(params))

    if (isLogged) {
        const menuButtonDiv = header_.querySelector(
            `#${placeholders.menuButton}`
        )
        menuButtonDiv.appendChild(
            button({
                imgSrc: "menu_white_48dp.svg",
                class_: ["btn__navbar_default"],
                imgStyle: ["btn__image_default"]
            })
        )
        const settingsButtonDiv = header_.querySelector(
            `#${placeholders.settingsButton}`
        )
        settingsButtonDiv.appendChild(
            linkButtons.profileSettings({
                imgSrc: "settings_white_48dp.svg",
                class_: ["btn__navbar_default"],
                imgStyle: ["btn__image_default"]
            })
        )
    }

    return header_
}

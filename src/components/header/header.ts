import styles from "./header.css"
import headerTemplate from "./header.hbs"
import { string2DomElement, selectPlaceholder } from "../../utils/utils"
import { linkButtons } from "../../router/tempButtons"
import { button } from "../button"
import { isLogged } from "../../consts"

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
    const headerElement = string2DomElement(headerTemplate(params))

    if (isLogged) {
        const menuButtonDiv = selectPlaceholder(
            headerElement,
            placeholders.menuButton
        )
        menuButtonDiv.appendChild(
            button({
                imgSrc: "menu_white_48dp.svg",
                class_: ["btn__navbar_default"],
                imgStyle: ["btn__image_default"]
            })
        )
        const settingsButtonDiv = selectPlaceholder(
            headerElement,
            placeholders.settingsButton
        )
        settingsButtonDiv.appendChild(
            linkButtons.profileSettings({
                imgSrc: "settings_white_48dp.svg",
                class_: ["btn__navbar_default"],
                imgStyle: ["btn__image_default"]
            })
        )
    }

    return headerElement
}

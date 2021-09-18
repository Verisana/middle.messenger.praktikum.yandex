import styles from "./header.css"
import headerTemplate from "./header.hbs"
import { compile2Dom } from "../../utils/utils"
import { linkButtons } from "../../router/tempButtons"
import { Button } from "../button"
import { isLogged } from "../../consts"
import { SettingsPage } from "../../pages/settings"
import { Block } from "../block"

export class Header extends Block {
    constructor() {
        super({
            props: {
                isLogged,
                logoStyles: styles.logo,
                MenuButton: new Button({
                    props: {
                        imgSrc: "menu_white_48dp.svg",
                        rootClass: ["button__navbar"],
                        imgStyle: ["button__image"]
                    }
                }),
                SettingsButton: linkButtons.profileSettings(
                    {
                        imgSrc: "settings_white_48dp.svg",
                        rootClass: ["button__navbar"],
                        imgStyle: ["button__image"]
                    },
                    () => new SettingsPage()
                )
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(headerTemplate, this.props)
    }
}

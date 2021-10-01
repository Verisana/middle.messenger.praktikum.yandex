import styles from "./header.css"
import headerTemplate from "./header.hbs"
import { compileToDom } from "../../utils/dom_utils"
import { Button } from "../button"
import { isLogged } from "../../consts"
import { Block } from "../block"
import { routerFactory } from "../../router"
import { urlSlugs } from "../../routes"

const router = routerFactory()

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
                SettingsButton: new Button({
                    props: {
                        events: {
                            click: [router.go.bind(router, urlSlugs.settings)]
                        },
                        rootClass: ["button__navbar"],
                        imgSrc: "settings_white_48dp.svg",
                        imgStyle: ["button__image"]
                    }
                })
            }
        })
    }

    render(): HTMLElement {
        return compileToDom(headerTemplate, this.props)
    }
}

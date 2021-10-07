import "./header.css"
import headerTemplate from "./header.hbs"
import { compileToDom } from "../../utils/dom_utils"
import { Button } from "../button"
import { urlSlugs } from "../../consts"
import { Block } from "../block"
import { routerFactory } from "../../router"
import { Logo } from "../logo"
import { store } from "../../store"

const router = routerFactory()

export class Header extends Block {
    constructor() {
        const isLogged = store.select("user") !== undefined

        super({
            props: {
                isLogged,
                MenuButton: new Button({
                    props: {
                        rootClass: ["button__navbar"],
                        imgSrc: "menu_white_48dp.svg",
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
                }),
                Logo: new Logo({ props: {} })
            }
        })
    }

    render(): HTMLElement {
        return compileToDom(headerTemplate, this.props)
    }
}

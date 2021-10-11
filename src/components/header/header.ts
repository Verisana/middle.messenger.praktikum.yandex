import "./header.css"
import { Button } from "../button"
import { urlSlugs } from "../../consts"
import { Block } from "../block"
import { routerFactory } from "../../router"
import { Logo } from "../logo"
import { store } from "../../store"
import { authController } from "../../controllers"

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
                LogoutButton: new Button({
                    props: {
                        events: {
                            click: [authController.logout.bind(authController)]
                        },
                        rootClass: ["button__navbar"],
                        imgSrc: "logout_white_48dp.svg",
                        imgStyle: ["button__image"]
                    }
                }),
                Logo: new Logo({ props: {} })
            }
        })
    }

    render(): HTMLElement {
        return this._compile(
            /*html*/ `
            <header>
                <nav>
                    {{#if isLogged}}
                        {{{MenuButton}}}
                    {{/if}}
                    {{{Logo}}}
                    {{#if isLogged}}
                        {{{SettingsButton}}}{{{LogoutButton}}}
                    {{/if}}
                </nav>
            </header>
        `,
            this.props
        )
    }
}

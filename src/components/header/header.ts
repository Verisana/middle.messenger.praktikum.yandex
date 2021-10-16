import "./header.css"
import logoutIcon from "../../../static/logout_white_48dp.svg"
import settingsIcon from "../../../static/settings_white_48dp.svg"
import menuIcon from "../../../static/menu_white_48dp.svg"

import { Button } from "../button"
import { urlSlugs } from "../../consts"
import { Block } from "../block"
import { routerFactory } from "../../router"
import { Logo } from "../logo"
import { store } from "../../store"
import { authController } from "../../controllers"
import { IHeaderProps } from "./types"

const router = routerFactory()

export class Header extends Block<IHeaderProps> {
  constructor() {
    const isLogged = store.select("user") !== undefined

    super({
      props: {
        isLogged,
        MenuButton: new Button({
          props: {
            rootClass: ["button__navbar"],
            imgSrc: menuIcon,
            imgStyle: ["button__image"]
          }
        }),
        SettingsButton: new Button({
          props: {
            events: {
              click: [() => router.go(urlSlugs.settings)]
            },
            rootClass: ["button__navbar"],
            imgSrc: settingsIcon,
            imgStyle: ["button__image"]
          }
        }),
        LogoutButton: new Button({
          props: {
            events: {
              click: [() => authController.logout()]
            },
            rootClass: ["button__navbar"],
            imgSrc: logoutIcon,
            imgStyle: ["button__image"]
          }
        }),
        Logo: new Logo({ props: {} })
      }
    })
  }

  render(): [string, IHeaderProps] {
    return [
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
    ]
  }
}

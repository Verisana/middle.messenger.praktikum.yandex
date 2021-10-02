import "./404.css"
import errorTemplate from "./404.hbs"
import { compileToDom } from "../../../utils/dom_utils"
import { Block } from "../../../components/block"
import { Button } from "../../../components/button"
import { routerFactory } from "../../../router"
import { urlSlugs } from "../../../consts"

const router = routerFactory()

export class ErrorPage extends Block {
    constructor() {
        super({
            props: {
                HomeButton: new Button({
                    props: {
                        events: {
                            click: [router.go.bind(router, urlSlugs.home)]
                        }
                    }
                })
            }
        })
    }

    render(): HTMLElement {
        return compileToDom(errorTemplate, this.props)
    }
}

import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import footerTemplate from "./footer.hbs"
import { linkButtons } from "../../router/tempButtons"
import { pages } from "../../pages"
import { Block } from "../block"
import { Button } from "../button"
import { IFooterParams } from "./types"
import { compile2Dom } from "../../utils/utils"

export class Footer extends Block {
    constructor() {
        const routeButtons: Button[] = []
        for (const [route, button] of Object.entries(linkButtons)) {
            routeButtons.push(button({}, pages[route]))
        }

        const params: IFooterParams = {
            props: {
                contentClass: layoutStyles.content,
                LinkButtons: routeButtons
            }
        }

        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(footerTemplate, this.props)
    }
}

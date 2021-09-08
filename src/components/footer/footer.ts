import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import footerTemplate from "./footer.hbs"
import { linkButtons } from "../../router/tempButtons"
import { DESTINATIONS } from "../../router/destinations"
import { Block } from "../../block"
import { Button } from "../button"
import { IFooterParams } from "./types"
import { compile2Dom } from "../../utils/utils"

export class Footer extends Block {
    constructor() {
        const routeButtons: Button[] = []
        for (const [route, button] of Object.entries(linkButtons)) {
            routeButtons.push(button({}, DESTINATIONS[route]))
        }

        const params: IFooterParams = {
            props: {
                contentClass: layoutStyles.content,
                linkButtons: routeButtons
            }
        }

        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(footerTemplate, this.props)
    }
}

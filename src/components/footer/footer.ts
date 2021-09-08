import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import footerTemplate from "./footer.hbs"
import { linkButtons } from "../../router/tempButtons"
import { DESTINATIONS } from "../../router/destinations"
import { Block } from "../../block"
import { Button } from "../button"
import { IFooterParams, IFooterProps } from "./types"

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

        super("footer", params)
    }

    render(): string {
        const renderedButtons: string[] = []
        const props = this.props as IFooterProps
        for (const button of props.linkButtons) {
            renderedButtons.push(button.render())
        }
        return footerTemplate({
            ...this.props,
            linkButtons: renderedButtons
        })
    }
}

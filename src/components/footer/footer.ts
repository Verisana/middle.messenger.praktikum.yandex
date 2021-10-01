import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import footerTemplate from "./footer.hbs"
import { Block } from "../block"
import { IFooterParams } from "./types"
import { compile2Dom } from "../../utils/dom_utils"

export class Footer extends Block {
    constructor() {
        const params: IFooterParams = {
            props: {
                contentClass: layoutStyles.content
            }
        }

        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(footerTemplate, this.props)
    }
}

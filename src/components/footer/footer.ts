import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import footerTemplate from "./footer.hbs"
import { Block } from "../block"
import { IFooterParams } from "./types"
import { compileToDom } from "../../utils/dom_utils"

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
        return compileToDom(footerTemplate, this.props)
    }
}

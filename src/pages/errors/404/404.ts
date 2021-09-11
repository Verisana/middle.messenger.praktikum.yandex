import "./404.css"
import errorTemplate from "./404.hbs"
import { compile2Dom } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { HomePage } from "../../home"
import { Block } from "../../../block"

export class ErrorPage extends Block {
    constructor() {
        super({
            props: { HomeButton: linkButtons.home({}, () => new HomePage()) }
        })
    }

    render(): HTMLElement {
        return compile2Dom(errorTemplate, this.props)
    }
}

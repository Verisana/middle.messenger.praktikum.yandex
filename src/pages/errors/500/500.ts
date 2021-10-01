import "./500.css"
import serverErrorTemplate from "./500.hbs"
import { compile2Dom } from "../../../utils/dom_utils"
import { Block } from "../../../components/block"

export class ServerErrorPage extends Block {
    constructor() {
        super({ props: {} })
    }

    render(): HTMLElement {
        return compile2Dom(serverErrorTemplate, this.props)
    }
}

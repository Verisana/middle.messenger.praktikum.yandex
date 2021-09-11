import "./500.css"
import serverErrorTemplate from "./500.hbs"
import { compile2Dom } from "../../../utils/utils"
import { Block } from "../../../block"

export class ServerErrorPage extends Block {
    constructor() {
        super({})
    }

    render(): HTMLElement {
        return compile2Dom(serverErrorTemplate, this.props)
    }
}

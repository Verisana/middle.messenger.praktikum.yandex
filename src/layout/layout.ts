import "./layout.css"
import layoutTemplate from "./layout.hbs"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { HomePage } from "../pages/home"
import { compile2Dom } from "../utils/utils"
import { Block } from "../components/block"

class Layout extends Block {
    constructor() {
        super({
            props: {
                Header: new Header(),
                Content: new HomePage(),
                Footer: new Footer()
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(layoutTemplate, this.props)
    }
}

export const layout = new Layout()

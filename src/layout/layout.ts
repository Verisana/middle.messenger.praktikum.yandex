import "./layout.css"
import layoutTemplate from "./layout.hbs"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { compileToDom } from "../utils/dom_utils"
import { Block } from "../components/block"

export class Layout extends Block {
    constructor(content: () => Block) {
        super({
            props: {
                Header: new Header(),
                Content: content(),
                Footer: new Footer()
            }
        })
    }

    render(): HTMLElement {
        return compileToDom(layoutTemplate, this.props)
    }
}

export function layoutFactory(content: () => Block): () => Layout {
    return () => new Layout(content)
}

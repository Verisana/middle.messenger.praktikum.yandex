import "./layout.css"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
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
        return this._compile(
            /*html*/ `
            <div id="App">
                {{{Header}}}
                {{{Content}}}
                {{{Footer}}}
            </div>
        `,
            this.props
        )
    }
}

export function layoutFactory(content: () => Block): () => Layout {
    return () => new Layout(content)
}

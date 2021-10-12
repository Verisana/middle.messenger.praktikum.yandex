import "./layout.css"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Block, Props } from "../components/block"

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

    render(): [string, Props] {
        return [
            /*html*/ `
            <div id="App">
                {{{Header}}}
                {{{Content}}}
                {{{Footer}}}
            </div>
        `,
            this.props
        ]
    }
}

export function layoutFactory(content: () => Block): () => Layout {
    return () => new Layout(content)
}

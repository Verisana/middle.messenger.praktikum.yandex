import "./layout.css"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { Block, Props } from "../components/block"
import { ILayoutProps } from "./types"

export class Layout<T extends Props> extends Block<ILayoutProps<T>> {
  constructor(content: () => Block<T>) {
    super({
      props: {
        Header: new Header(),
        Content: content(),
        Footer: new Footer()
      }
    })
  }

  render(): [string, ILayoutProps<T>] {
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

export function layoutFactory<T extends Props>(
  content: () => Block<T>
): () => Layout<T> {
  return () => new Layout(content)
}

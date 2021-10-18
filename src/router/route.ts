import { Props } from "../components/block"
import { Layout } from "../layout"
import { render } from "../utils/dom_utils"
import { isEqual } from "../utils/utils"

export class Route<T extends Props> {
  private _pathname: string

  private _pageFactory: () => Layout<T>

  private _page: Layout<T> | null

  private _rootQuery: string

  constructor(
    pathname: string,
    pageFactory: () => Layout<T>,
    rootQuery: string
  ) {
    this._pathname = pathname
    this._pageFactory = pageFactory
    this._page = null
    this._rootQuery = rootQuery
  }

  get pathname(): string {
    return this._pathname
  }

  get page(): Layout<T> | null {
    return this._page
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname
      this.render()
    }
  }

  leave() {
    if (this._page) {
      this._page = null
    }
  }

  match(pathname: string) {
    return isEqual({ pathname }, { pathname: this._pathname })
  }

  render() {
    if (!this._page) {
      this._page = this._pageFactory()
      render(this._rootQuery, this._page)
    }
  }
}

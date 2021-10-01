import { Block } from "../components/block"
import { render } from "../utils/dom_utils"
import { isEqual } from "../utils/utils"

export class Route {
    private _pathname: string

    private _pageFactory: () => Block

    private _page: Block | null

    private _rootQuery: string

    constructor(pathname: string, page: () => Block, rootQuery: string) {
        this._pathname = pathname
        this._pageFactory = page
        this._page = null
        this._rootQuery = rootQuery
    }

    get pathname(): string {
        return this._pathname
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

import { Props } from "../components/block"
import { isEqual } from "../utils/utils"
import { Route } from "./route"

export class RedirectRoute {
  private _decisionFunction: () => string

  private _routes: Record<string, Route<Props>>

  private _pathname: string

  constructor(
    pathname: string,
    routes: Record<string, Route<Props>>,
    decisionFunction: () => string
  ) {
    this._routes = routes
    this._decisionFunction = decisionFunction
    this._pathname = pathname
  }

  match(pathname: string) {
    return isEqual({ pathname }, { pathname: this._pathname })
  }

  redirect(): Route<Props> {
    const route = this._decisionFunction()
    if (this._routes[route] === undefined)
      throw new Error("Something is wrong. You must always receive valid Route")
    return this._routes[route]
  }
}

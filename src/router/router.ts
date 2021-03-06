import { RedirectRoute } from "./redirect"
import { Props } from "../components/block"
import { Route } from "./route"
import { rootQuery } from "../consts"
import { Layout } from "../layout"

class Router {
  static __instance: Router

  private _currentRoute: Route<Props> | null

  private _rootQuery: string

  private _errorRoute?: Route<Props>

  routes: (Route<Props> | RedirectRoute)[]

  history: History

  constructor(rootQuery_: string) {
    this.routes = []
    this.history = window.history
    this._currentRoute = null
    this._rootQuery = rootQuery_

    if (Router.__instance) {
      return Router.__instance
    }

    Router.__instance = this
  }

  use(pathname: string, blockBuilder: () => any) {
    const route = new Route(pathname, blockBuilder, this._rootQuery)

    this.routes.push(route)

    return this
  }

  useRedirect(
    pathname: string,
    blockBuilders: Record<string, () => Layout<Props>>,
    decisionFunction: () => string
  ) {
    const routes: Record<string, Route<Props>> = {}
    for (const [redirectName, blockBuilder] of Object.entries(blockBuilders)) {
      routes[redirectName] = new Route(
        redirectName,
        blockBuilder,
        this._rootQuery
      )
    }
    const redirectRoute = new RedirectRoute(pathname, routes, decisionFunction)
    this.routes.push(redirectRoute)
    return this
  }

  useError(pathname: string, blockBuilder: () => Layout<Props>) {
    this._errorRoute = new Route(pathname, blockBuilder, this._rootQuery)
    return this
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window
      if (target !== null) {
        this._onRoute(target.location.pathname)
      } else {
        throw new Error(
          "You must always find target element. If not something is broken"
        )
      }
    }

    this._onRoute(window.location.pathname)
  }

  get page(): Layout<Props> {
    const route = this._currentRoute
    if (route !== null && route.page !== null) {
      return route.page
    }
    throw new Error("Page must be found!")
  }

  private _onRoute(pathname: string) {
    let route = this._getRoute(pathname)

    if (route === undefined) {
      this.history.replaceState({}, "", this._errorRoute?.pathname)
      route = this._errorRoute
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave()
    }

    if (route === undefined) throw new Error("Unexpected undefined for route")
    this._currentRoute = route
    route.render()
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname)
    this._onRoute(pathname)
  }

  back() {
    this.history.back()
  }

  forward() {
    this.history.forward()
  }

  private _getRoute(pathname: string): Route<Props> | undefined {
    let foundRoute = this.routes.find((route) => {
      return route.match(pathname)
    })
    if (foundRoute instanceof RedirectRoute) {
      foundRoute = foundRoute.redirect()
    }
    if (foundRoute !== undefined) {
      this.history.replaceState({}, "", foundRoute.pathname)
    }

    return foundRoute
  }
}

function routerFactory(): Router {
  return new Router(rootQuery)
}

export { Router, routerFactory }

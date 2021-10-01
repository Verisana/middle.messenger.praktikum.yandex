import { RedirectRoute } from "./redirect"
import { Block } from "../components/block"
import { Route } from "./route"
import { rootQuery } from "../consts"

class Router {
    static __instance: Router

    private _currentRoute: Route | null

    private _rootQuery: string

    private _errorRoute?: Route

    private _serverErrorRoute?: Route

    routes: (Route | RedirectRoute)[]

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

    use(pathname: string, blockBuilder: () => Block) {
        const route = new Route(pathname, blockBuilder, this._rootQuery)

        this.routes.push(route)

        return this
    }

    useRedirect(
        pathname: string,
        blockBuilders: Record<string, () => Block>,
        decisionFunction: () => string
    ) {
        const routes: Record<string, Route> = {}
        for (const [redirectName, blockBuilder] of Object.entries(
            blockBuilders
        )) {
            routes[redirectName] = new Route(
                pathname,
                blockBuilder,
                this._rootQuery
            )
        }
        const redirectRoute = new RedirectRoute(routes, decisionFunction)
        this.routes.push(redirectRoute)

        return this
    }

    useError(pathname: string, block: () => Block) {
        this._errorRoute = new Route(pathname, block, this._rootQuery)
        return this
    }

    useServerError(pathname: string, block: () => Block) {
        this._serverErrorRoute = new Route(pathname, block, this._rootQuery)
        return this
    }

    start() {
        window.onpopstate = (event: PopStateEvent) => {
            const target = event.currentTarget as Window
            if (target !== null) {
                this._onRoute(target.location.pathname)
            } else {
                throw new Error(
                    "You must always find target element. " +
                        "If not something is broken"
                )
            }
        }

        this._onRoute(window.location.pathname)
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname)
        if (!route) {
            return
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave()
        }

        this._currentRoute = route
        route.render()
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname)
        this._onRoute(pathname)
    }

    goServerError() {
        if (this._serverErrorRoute === undefined) {
            throw new Error("First, call useServerError route settings method")
        }
        this.history.pushState({}, "", this._serverErrorRoute.pathname)
        this._onRoute(this._serverErrorRoute.pathname)
    }

    back() {
        this.history.back()
    }

    forward() {
        this.history.forward()
    }

    getRoute(pathname: string): Route | undefined {
        let foundRoute = this.routes.find((route_) => {
            const route =
                route_ instanceof RedirectRoute ? route_.redirect() : route_
            return route.match(pathname)
        })

        if (foundRoute instanceof RedirectRoute) {
            foundRoute = foundRoute.redirect()
        }

        return foundRoute === undefined ? this._errorRoute : foundRoute
    }
}

function routerFactory(): Router {
    return new Router(rootQuery)
}

export { Router, routerFactory }

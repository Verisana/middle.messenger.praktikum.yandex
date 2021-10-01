import { Route } from "./route"

export class RedirectRoute {
    private _decisionFunction: () => string

    private _routes: Record<string, Route>

    constructor(routes: Record<string, Route>, decisionFunction: () => string) {
        this._routes = routes
        this._decisionFunction = decisionFunction
    }

    redirect(): Route {
        const route = this._decisionFunction()
        if (this._routes[route] === undefined)
            throw new Error(
                "Something is wrong. You must always receive valid Route"
            )
        return this._routes[route]
    }
}

import { urlSlugs } from "../consts"
import { layoutFactory } from "../layout"
import { pages } from "../pages"
import { store } from "../store"

export function loginRedirectBuilder(destination: string) {
    return (): string => {
        return store.select("user") === undefined ? urlSlugs.login : destination
    }
}

export function loginBlockBuilder(destination: string, pageName: string) {
    return {
        [urlSlugs.login]: layoutFactory(pages.login),
        [destination]: layoutFactory(pages[pageName])
    }
}

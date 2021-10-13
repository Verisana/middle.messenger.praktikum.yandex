import { urlSlugs } from "../consts"
import { layoutFactory } from "../layout"
import { pages } from "../pages"
import { store } from "../store"

export function loginRedirectBuilder(destination: string, slug?: string) {
    const currentSlug = slug === undefined ? urlSlugs.login : slug
    return (): string => {
        return store.select("user") === undefined ? currentSlug : destination
    }
}

export function loginBlockBuilder(
    destination: string,
    pageName: string,
    slug?: string,
    page?: () => any
) {
    const currentSlug = slug === undefined ? urlSlugs.login : slug
    const currentPage = page === undefined ? pages.login : page

    return {
        // Не знаю, как тут правильно типы проставить. Какие-то непонятные ошибки

        [currentSlug]: layoutFactory(currentPage as any),
        // @ts-expect-error
        [destination]: layoutFactory(pages[pageName])
    }
}

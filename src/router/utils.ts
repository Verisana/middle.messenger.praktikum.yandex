import { Block, Props } from "../components/block"
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

export function loginBlockBuilder<T extends Props>(
    destination: string,
    pageName: string,
    slug?: string,
    page?: () => Block<T>
) {
    const currentSlug = slug === undefined ? urlSlugs.login : slug
    const currentPage = page === undefined ? pages.login : page

    return {
        // Не знаю, как тут правильно типы проставить. Какие-то непонятные ошибки

        // @ts-expect-error
        [currentSlug]: layoutFactory<T>(currentPage),
        // @ts-expect-error
        [destination]: layoutFactory<Props>(pages[pageName])
    }
}

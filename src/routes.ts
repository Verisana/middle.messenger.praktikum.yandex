import { Router } from "./router"
import { pages } from "./pages"
import { isLogged, rootQuery } from "./consts"
import { layoutFactory } from "./layout"

const router = new Router(rootQuery)

const urlSlugs = {
    home: "/",
    register: "/sign-up",
    settings: "/settings",
    messenger: "/messenger",
    login: "/login",
    error: "/page-error",
    serverError: "/server-error"
}

router.useRedirect(
    urlSlugs.home,
    {
        login: layoutFactory(pages.login),
        messenger: layoutFactory(pages.messenger)
    },
    () => (isLogged ? "messenger" : "login")
)

router.use(urlSlugs.register, layoutFactory(pages.register))
router.use(urlSlugs.settings, layoutFactory(pages.settings))
router.use(urlSlugs.messenger, layoutFactory(pages.messenger))
router.use(urlSlugs.login, layoutFactory(pages.login))
router.useError(urlSlugs.error, layoutFactory(pages.error))
router.useServerError(urlSlugs.serverError, layoutFactory(pages.serverError))

router.start()

export { router, urlSlugs }

import "@fontsource/roboto"
import { routerFactory } from "./router"
import { pages } from "./pages"
import { isLogged, urlSlugs } from "./consts"
import { layoutFactory } from "./layout"

const router = routerFactory()

router.useRedirect(
    urlSlugs.home,
    {
        login: layoutFactory(pages.login),
        messenger: layoutFactory(pages.messenger)
    },
    () => (isLogged ? "messenger" : "login")
)

router.use(urlSlugs.register, layoutFactory(pages.register))
router.use(urlSlugs.settings, layoutFactory(pages.profileSettings))
router.use(urlSlugs.messenger, layoutFactory(pages.messenger))
router.use(urlSlugs.login, layoutFactory(pages.login))
router.use(urlSlugs.serverError, layoutFactory(pages.serverError))
router.useError(urlSlugs.error, layoutFactory(pages.error))

router.start()

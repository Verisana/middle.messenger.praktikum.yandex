import "@fontsource/roboto"
import { routerFactory } from "./router"
import { pages } from "./pages"
import { urlSlugs } from "./consts"
import { layoutFactory } from "./layout"
import { store } from "./store"
import authController from "./controllers/auth_controller"

const router = routerFactory()

async function main() {
    await authController.userRead()

    router.useRedirect(
        urlSlugs.home,
        {
            login: layoutFactory(pages.login),
            messenger: layoutFactory(pages.messenger)
        },
        () => (store.select("user") !== undefined ? "messenger" : "login")
    )

    router.use(urlSlugs.register, layoutFactory(pages.register))
    router.use(urlSlugs.login, layoutFactory(pages.login))
    router.use(urlSlugs.settings, layoutFactory(pages.profileSettings))
    router.use(urlSlugs.messenger, layoutFactory(pages.messenger))
    router.use(urlSlugs.serverError, layoutFactory(pages.serverError))
    router.useError(urlSlugs.error, layoutFactory(pages.error))

    router.start()
}

main()
    .then(() => {})
    .catch((error) => {
        console.error(error)
    })

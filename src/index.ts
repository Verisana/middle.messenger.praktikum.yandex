import "@fontsource/roboto"
import { routerFactory } from "./router"
import { pages } from "./pages"
import { urlSlugs } from "./consts"
import { layoutFactory } from "./layout"
import { authController } from "./controllers"
import { loginBlockBuilder, loginRedirectBuilder } from "./router/utils"

const router = routerFactory()

async function main() {
    await authController.userRead()
    router.useRedirect(
        urlSlugs.home,
        loginBlockBuilder(urlSlugs.messenger, "messenger"),
        loginRedirectBuilder(urlSlugs.messenger)
    )

    router.useRedirect(
        urlSlugs.login,
        loginBlockBuilder(urlSlugs.messenger, "messenger"),
        loginRedirectBuilder(urlSlugs.messenger)
    )

    router.useRedirect(
        urlSlugs.register,
        loginBlockBuilder(
            urlSlugs.messenger,
            "messenger",
            urlSlugs.register,
            pages.register
        ),
        loginRedirectBuilder(urlSlugs.messenger, urlSlugs.register)
    )

    router.useRedirect(
        urlSlugs.settings,
        loginBlockBuilder(urlSlugs.settings, "profileSettings"),
        loginRedirectBuilder(urlSlugs.settings)
    )

    router.useRedirect(
        urlSlugs.messenger,
        loginBlockBuilder(urlSlugs.messenger, "messenger"),
        loginRedirectBuilder(urlSlugs.messenger)
    )

    router.use(urlSlugs.serverError, layoutFactory(pages.serverError))
    router.useError(urlSlugs.error, layoutFactory(pages.error))

    router.start()
}

main()
    .then(() => {})
    .catch((error) => {
        console.error(error)
    })

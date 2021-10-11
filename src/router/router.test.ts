import { JSDOM } from "jsdom"
import { expect } from "chai"
import { rootQuery } from "../consts"
import { Router } from "./router"
import { Route } from "./route"
import { RedirectRoute } from "./redirect"
import { Block } from "../components/block"

describe("Test Router", () => {
    let dom: JSDOM
    let router: Router
    const pages = {
        login: () => {
            return {
                render: () => "render",
                leave: () => "leave"
            } as unknown as Block
        },
        register: () => {
            return {
                render: () => "render",
                leave: () => "leave"
            } as unknown as Block
        },
        messenger: () => {
            return {
                render: () => "render",
                leave: () => "leave"
            } as unknown as Block
        },
        profileSettings: () => {
            return {
                render: () => "render",
                leave: () => "leave"
            } as unknown as Block
        },
        error: () => {
            return {
                render: () => "render",
                leave: () => "leave"
            } as unknown as Block
        }
    }

    beforeEach(() => {
        dom = new JSDOM(
            `<html></html><body><div id="App"></div><script type="text/javascript" src="../index.ts"></script></body></html>`,
            {
                url: "http://localhost:1234"
            }
        )

        // @ts-expect-error
        Router.__instance = undefined
        router = new Router(rootQuery)
    })

    it("use method", () => {
        router.use("/login", pages.login)
        const route = router.routes[0] as Route
        expect(router.routes.length).to.be.equal(1)
        expect(route.pathname).to.be.equal("/login")
    })
    it("redirect method", () => {
        router.useRedirect(
            "/login",
            { "/login": pages.login, "/register": pages.register },
            () => "/login"
        )
        const route = router.routes[0] as RedirectRoute
        expect(router.routes.length).to.be.equal(1)
        expect(route.redirect().pathname).to.be.equal("/login")
    })
    it("use error method", () => {
        router.use("/login", pages.login)
        router.useError("/error", pages.error)
        router.start()

        router.go("/notExist")
        expect(window.location.pathname).to.be.equal("/error")
    })
    it("start", () => {
        router.use("/login", pages.login)
        router.use("/", pages.profileSettings)

        router.useRedirect(
            "/register",
            { "/login": pages.login, "/messenger": pages.messenger },
            () => "/messenger"
        )
        router.start()
        expect(window.location.pathname).to.be.equal("/")
    })
    it("get page", () => {
        router.use("/login", pages.login)
        router.use("/", pages.profileSettings)
        router.start()

        expect(router.page).to.not.equal(null)
    })
    it("go method", () => {
        router.use("/login", pages.login)
        router.use("/", pages.profileSettings)
        router.start()

        router.go("/login")
        expect(window.location.pathname).to.be.equal("/login")
    })
    it("back method", () => {
        router.use("/login", pages.login)
        router.use("/", pages.profileSettings)
        router.start()

        router.go("/login")
        router.back()
        expect(window.location.pathname).to.be.equal("/")
    })
    it("forward method", () => {
        router.use("/login", pages.login)
        router.use("/", pages.profileSettings)
        router.start()

        router.go("/login")
        router.back()
        router.forward()
        expect(window.location.pathname).to.be.equal("/login")
    })
})

import sinon from "sinon"
import { DOMWindow, JSDOM } from "jsdom"
import { expect } from "chai"
import { rootQuery } from "../consts"
import { Router } from "./router"
import { Route } from "./route"
import { RedirectRoute } from "./redirect"
import { Props } from "../components/block"
import { Layout } from "../layout"

const div = document.createElement("div")
div.id = "App"

describe("Test Router", () => {
    let dom: JSDOM
    let router: Router

    const pages = {
        login: () => {
            return {
                content: div,
                render: () => "render",
                leave: () => "leave"
            } as unknown as Layout<Props>
        },
        register: () => {
            return {
                content: div,
                render: () => "render",
                leave: () => "leave"
            } as unknown as Layout<Props>
        },
        messenger: () => {
            return {
                content: div,
                render: () => "render",
                leave: () => "leave"
            } as unknown as Layout<Props>
        },
        profileSettings: () => {
            return {
                content: div,
                render: () => "render",
                leave: () => "leave"
            } as unknown as Layout<Props>
        },
        error: () => {
            return {
                content: div,
                render: () => "render",
                leave: () => "leave"
            } as unknown as Layout<Props>
        }
    }

    beforeEach(() => {
        dom = new JSDOM(
            `<html></html><body><div id="App"></div></body></html>`,
            {
                url: "http://localhost:1234"
            }
        )

        // @ts-expect-error
        global.window = dom.window as DOMWindow

        global.document = dom.window.document

        // @ts-expect-error
        Router.__instance = undefined
        router = new Router(rootQuery)
    })

    it("use method", () => {
        router.use("/login", pages.login)
        const route = router.routes[0] as Route<Props>
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
        const backSpy = sinon.spy(global.window.history, "back")
        router.back()
        expect(backSpy.callCount).to.be.equal(1)
    })
    it("forward method", () => {
        const forwardSpy = sinon.spy(global.window.history, "forward")
        router.forward()
        expect(forwardSpy.callCount).to.be.equal(1)
    })
})

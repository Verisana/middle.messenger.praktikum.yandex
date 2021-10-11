import { expect } from "chai"
import { JSDOM } from "jsdom"
import { Button, IButtonParams } from "."
import { rootQuery } from "../../consts"

describe("Test Button", () => {
    let dom: JSDOM

    beforeEach(() => {
        dom = new JSDOM(
            `<html></html><body><div id="App"></div><script type="text/javascript" src="../index.ts"></script></body></html>`,
            {
                url: "http://localhost:1234"
            }
        )
    })

    it("initialization", () => {
        const params: IButtonParams = {
            props: {
                text: "Test",
                type_: "text"
            }
        }
        const button = new Button(params)
        expect(button.props.text).to.be.equal(params.props.text)
        expect(button.props.type_).to.be.equal(params.props.type_)
    })

    it("props update rerendering", () => {
        const params: IButtonParams = {
            props: {
                text: "Test",
                type_: "text"
            }
        }
        const button = new Button(params)
        const div = document.getElementById(rootQuery)

        if (div !== null && button.content !== null) {
            div.replaceChildren(button.content)
        } else {
            throw new Error("You must find div in tests")
        }

        expect(button.content.textContent).to.be.equal(params.props.text)

        const textChanged = "Changed"

        // @ts-expect-error
        button.props = textChanged

        expect(button.content.textContent).to.be.equal(textChanged)
    })
})

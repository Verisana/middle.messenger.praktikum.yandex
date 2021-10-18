import { expect } from "chai"
import { JSDOM } from "jsdom"
import { IButtonProps } from "./types"
import { BlockParams } from "../block"
import { Button } from "./button"

describe("Test Button", () => {
  let dom: JSDOM

  beforeEach(() => {
    dom = new JSDOM(`<html><body><div id="App"></div></body></html>`, {
      url: "http://localhost:1234"
    })

    // @ts-expect-error
    global.window = dom.window as DOMWindow

    global.document = dom.window.document
  })

  it("initialization", () => {
    const params: BlockParams<IButtonProps> = {
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
    const params: BlockParams<IButtonProps> = {
      props: {
        text: "Test",
        type_: "text"
      }
    }

    const button = new Button(params)
    const div = document.body.firstElementChild
    if (div !== null && button.content !== null) {
      div.appendChild(button.content)
    } else {
      throw new Error("You must find div in tests")
    }

    // eslint-disable-next-line
    expect(button.content.textContent?.includes(params.props.text as string)).to
      .be.true

    const textChanged = "Changed"

    button.props.text = textChanged

    // eslint-disable-next-line
    expect(button.content.textContent?.includes(textChanged)).to.be.true
  })
})

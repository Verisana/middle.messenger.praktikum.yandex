import footerTemplate from "./footer.hbs"
import { string2DomElement } from "../../utils/utils.js"
import { linkButtons } from "../../router/tempButtons.js"

const footer = string2DomElement(footerTemplate())

for (const [, button] of Object.entries(linkButtons)) {
    footer.appendChild(button)
}

export { footer }

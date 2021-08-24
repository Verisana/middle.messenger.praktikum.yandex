import footerTemplate from "./footer.hbs"
import { string2DomElement } from "../../utils/utils.js"
import { linkButtons } from "../../router/tempButtons.js"

const footer = () => {
    const element = string2DomElement(footerTemplate())
    const paragraph = document.createElement("p")
    paragraph.textContent = "Служебные кнопки для проверки страниц задания"
    element.appendChild(paragraph)
    for (const [, button] of Object.entries(linkButtons)) {
        element.appendChild(button())
    }
    return element
}

export { footer }

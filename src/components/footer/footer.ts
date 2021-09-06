import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import footerTemplate from "./footer.hbs"
import { string2DomElement } from "../../utils/utils"
import { linkButtons } from "../../router/tempButtons"

export const footer = () => {
    const params = {
        contentClass: layoutStyles.content
    }

    const element = string2DomElement(footerTemplate(params))
    const paragraph = document.createElement("p")
    paragraph.textContent = "Служебные кнопки для проверки страниц задания"
    element.appendChild(paragraph)
    for (const [, button] of Object.entries(linkButtons)) {
        element.appendChild(button({}))
    }
    return element
}
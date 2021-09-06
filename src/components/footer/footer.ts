import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import footerTemplate from "./footer.hbs"
import { string2DomElement } from "../../utils/utils"
import { linkButtons } from "../../router/tempButtons"
import { DESTINATIONS } from "../../router/destinations"

export const footer = () => {
    const params = {
        contentClass: layoutStyles.content
    }

    const element = string2DomElement(footerTemplate(params))
    const paragraph = document.createElement("p")
    paragraph.textContent = "Служебные кнопки для проверки страниц задания"
    element.appendChild(paragraph)
    for (const [route, button] of Object.entries(linkButtons)) {
        element.appendChild(button({}, DESTINATIONS[route]))
    }
    return element
}

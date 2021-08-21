import classes from "./home.css"
import homeTemplate from "./home.hbs"
import { string2DomElement } from "../../utils/utils.js"
import { switchContent } from "../../router/router.js"
import { linkButtons } from "../../router/tempButtons"

const homeContent = () => {
    const content = string2DomElement(homeTemplate())
    for (const [buttonName, button] of Object.entries(linkButtons)) {
        content.appendChild(button)
    }

    return content
}
export { homeContent }

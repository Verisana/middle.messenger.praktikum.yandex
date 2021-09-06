import "./404.css"
import errorTemplate from "./404.hbs"
import { selectPlaceholder, string2DomElement } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { homeContent } from "../../home"

const errorContent = () => {
    const params = {
        linkToHome: "linkToHome"
    }
    const content = string2DomElement(errorTemplate(params))
    const buttonPlace = selectPlaceholder(content, params.linkToHome)
    buttonPlace.appendChild(linkButtons.home({}, homeContent))
    return content
}

export { errorContent }

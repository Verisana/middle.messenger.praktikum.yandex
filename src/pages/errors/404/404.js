import classes from "./404.css"
import errorTemplate from "./404.hbs"
import { string2DomElement } from "../../../utils/utils.js"
import { linkButtons } from "../../../router/tempButtons.js"

const errorContent = () => {
    const params = {
        linkToHome: "linkToHome"
    }
    const content = string2DomElement(errorTemplate(params))
    const buttonPlace = content.querySelector(`#${params.linkToHome}`)
    buttonPlace.appendChild(linkButtons.home)
    return content
}

export { errorContent }

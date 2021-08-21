import classes from "./404.css"
import errorTemplate from "./404.hbs"
import { string2DomElement } from "../../../utils/utils.js"
import { linkButtons } from "../../../router/tempButtons.js"

const errorContent = () => {
    const content = string2DomElement(errorTemplate())
    const buttonPlace = content.querySelector("#linkToHome")
    buttonPlace.appendChild(linkButtons.home)
    return content
}

export { errorContent }

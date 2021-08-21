import classes from "./home.css"
import homeTemplate from "./home.hbs"
import { string2DomElement } from "../../utils/utils.js"

const homeContent = () => {
    const content = string2DomElement(homeTemplate())
    return content
}

export { homeContent }

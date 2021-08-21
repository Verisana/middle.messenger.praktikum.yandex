import classes from "./404.css"
import errorTemplate from "./404.hbs"
import { string2DomElement } from "../../../utils/utils.js"

const errorContent = () => string2DomElement(errorTemplate())

export { errorContent }

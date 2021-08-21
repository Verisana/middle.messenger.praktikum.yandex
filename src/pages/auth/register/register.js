import classes from "./register.css"
import registerTemplate from "./register.hbs"
import { string2DomElement } from "../../../utils/utils.js"

const registerContent = () => string2DomElement(registerTemplate())

export { registerContent }

import classes from "./login.css"
import loginTemplate from "./login.hbs"
import { string2DomElement } from "../../../utils/utils.js"

const loginContent = () => string2DomElement(loginTemplate())

export { loginContent }

import classes from "./500.css"
import serverErrorTemplate from "./500.hbs"
import { string2DomElement } from "../../../utils/utils"

const serverErrorContent = () => string2DomElement(serverErrorTemplate())

export { serverErrorContent }

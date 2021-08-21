import classes from "./settings.css"
import settingsTemplate from "./settings.hbs"
import { string2DomElement } from "../../utils/utils.js"

const settingsContent = () => string2DomElement(settingsTemplate())

export { settingsContent }

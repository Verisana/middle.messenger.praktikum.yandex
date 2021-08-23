import headerTemplate from "./header.hbs"
import { string2DomElement } from "../../utils/utils.js"

const header = () => {
    return string2DomElement(headerTemplate())
}

export { header }

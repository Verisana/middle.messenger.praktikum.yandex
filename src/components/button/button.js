import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

const button = ({ text, class_, type_, imgSrc } = {}) => {
    const newClass_ = class_ === undefined ? ["btn"] : ["btn", ...class_]
    const params = {
        class_: convertStyles2Strings(styles, newClass_),
        text,
        type_,
        imgSrc
    }
    return string2DomElement(buttonTemplate(params))
}

export { button }

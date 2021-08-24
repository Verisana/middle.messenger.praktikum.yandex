import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

const button = ({ text, class_, type_, imgSrc } = {}) => {
    const params = {
        class_: convertStyles2Strings(styles, class_),
        text,
        type_,
        imgSrc
    }
    return string2DomElement(buttonTemplate(params))
}

export { button }

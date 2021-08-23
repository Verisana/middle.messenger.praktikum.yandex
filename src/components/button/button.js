import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

const button = ({ text, class_, type_ } = {}) => {
    const params = {
        class_: convertStyles2Strings(styles, class_),
        text,
        type_
    }
    return string2DomElement(buttonTemplate(params))
}

export { button }

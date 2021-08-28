import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

const button = ({ text, class_, type_, imgSrc, imgStyle } = {}) => {
    const params = {
        class_: convertStyles2Strings([styles], "btn", class_),
        text,
        type_: type_ === undefined ? "button" : type_,
        imgSrc,
        imgStyle: convertStyles2Strings([styles], imgStyle)
    }
    return string2DomElement(buttonTemplate(params))
}

export { button }

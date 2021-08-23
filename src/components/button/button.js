import classes from "./button.css"
import buttonTemplate from "./button.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

const button = ({ buttonName, classStyles } = {}) => {
    const params = {
        classStyles: convertStyles2Strings(classes, classStyles),
        buttonName
    }
    return string2DomElement(buttonTemplate(params))
}

export { button }

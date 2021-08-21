import classes from "./button.css"
import buttonTemplate from "./button.hbs"
import { string2DomElement } from "../../utils/utils.js"

const button = ({ buttonName, classList } = {}) => {
    const classStyles =
        classList === undefined
            ? ""
            : classList
                  .map((el) => classes[el])
                  .reduce((acc, classValue) => {
                      return acc + ` ${classValue}`
                  })

    const params = {
        classStyles: classStyles,
        buttonName: buttonName === undefined ? "" : buttonName
    }
    return string2DomElement(buttonTemplate(params))
}

export { button }

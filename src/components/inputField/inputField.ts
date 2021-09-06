import styles from "./inputField.css"
import inputFieldTemplate from "./inputField.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils"

export interface IInputField {
    barClass?: string
    divClass?: string
    label?: {
        text: string
        class?: string | string[]
    }
    inputPart?: {
        type: string
        class?: string | string[]
        required?: boolean
        pattern?: string
        placeholder?: string
        name?: string
    }
    br?: boolean
}

export const inputField = ({
    label,
    inputPart,
    br = false,
    barClass = styles.bar,
    divClass = styles.inputDiv_default
}: IInputField) => {
    const params: IInputField = {
        barClass,
        divClass,
        br
    }
    params.label =
        label === undefined
            ? undefined
            : {
                  text: label.text,
                  class: convertStyles2Strings([styles], label.class)
              }
    params.inputPart =
        inputPart === undefined
            ? undefined
            : {
                  class: convertStyles2Strings([styles], inputPart.class),
                  type: inputPart.type === undefined ? "text" : inputPart.type,
                  required:
                      inputPart.required === undefined
                          ? false
                          : inputPart.required,
                  pattern: inputPart.pattern,
                  placeholder: inputPart.placeholder,
                  name: inputPart.name
              }
    return string2DomElement(inputFieldTemplate(params))
}

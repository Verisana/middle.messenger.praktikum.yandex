import styles from "./inputField.css"
import inputFieldTemplate from "./inputField.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils"

export interface IInputField {
    barClass?: string
    divClass?: string
    label_?: {
        text: string
        class_?: string | string[]
    }
    input_?: {
        type: string
        class_?: string | string[]
        required?: boolean
        pattern?: string
        placeholder?: string
        name?: string
    }
    br_?: boolean
}

export const inputField = ({
    label_,
    input_,
    br_ = false,
    barClass = styles.bar,
    divClass = styles.inputDiv_default
}: IInputField) => {
    const params: IInputField = {
        barClass,
        divClass,
        br_
    }
    params.label_ =
        label_ === undefined
            ? undefined
            : {
                  text: label_.text,
                  class_: convertStyles2Strings([styles], label_.class_)
              }
    params.input_ =
        input_ === undefined
            ? undefined
            : {
                  class_: convertStyles2Strings([styles], input_.class_),
                  type: input_.type === undefined ? "text" : input_.type,
                  required:
                      input_.required === undefined ? false : input_.required,
                  pattern: input_.pattern,
                  placeholder: input_.placeholder,
                  name: input_.name
              }
    return string2DomElement(inputFieldTemplate(params))
}

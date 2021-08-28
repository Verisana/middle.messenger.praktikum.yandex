import styles from "./inputField.css"
import inputFieldTemplate from "./inputField.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

export const inputField = ({ label_, input_, br_ = false} = {}) => {
    const params = {}
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
    params.barClass = styles.bar
    params.divClass = styles.inputDiv_default
    params.br_ = br_
    const content = string2DomElement(inputFieldTemplate(params))
    return content
}

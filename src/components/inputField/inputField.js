import styles from "./inputField.css"
import inputFieldTemplate from "./inputField.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

export const inputField = ({ label_, input_, br_ } = {}) => {
    const params = {}
    params.label_ =
        label_ === undefined
            ? undefined
            : {
                  text: label_.text,
                  class_: convertStyles2Strings(styles, label_.class_)
              }
    params.input_ =
        input_ === undefined
            ? undefined
            : {
                  class_: convertStyles2Strings(styles, input_.class_),
                  type: input_.type,
                  required: input_.required,
                  pattern: input_.pattern,
                  placeholder: input_.placeholder,
                  name: input_.name
              }
    const content = string2DomElement(inputFieldTemplate(params))
    if (br_) content.append(document.createElement("br"))
    return content
}

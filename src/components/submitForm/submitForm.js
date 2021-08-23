import styles from "./submitForm.css"
import submitFormTemplate from "./submitForm.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

export const submitForm = ({ class_, inputBuilders, submitBuilder } = {}) => {
    const placeholders = {
        submitButton: "submitButtonPlaceholder",
        inputsPlace: "inputsPlaceholder"
    }

    const params = {
        class_: convertStyles2Strings(styles, class_),
        ...placeholders
    }
    const content = string2DomElement(submitFormTemplate(params))

    const submitButtonsDiv = content.querySelector(
        `#${placeholders.submitButton}`
    )
    submitButtonsDiv.appendChild(submitBuilder())

    const inputsDiv = content.querySelector(`#${placeholders.inputsPlace}`)
    for (const inputBuilder of inputBuilders) {
        inputsDiv.appendChild(inputBuilder())
    }

    return content
}

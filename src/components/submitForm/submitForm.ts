import styles from "./submitForm.css"
import submitFormTemplate from "./submitForm.hbs"
import {
    string2DomElement,
    convertStyles2Strings,
    selectPlaceholder
} from "../../utils/utils"

export interface ISubmitForm {
    inputBuilders: { (): Element }[]
    submitBuilder: () => Element
    formHeaderText?: string
    class_?: string | string[]
    isNoBorder?: boolean
    onSubmitFunc?: (event: Event) => void
}

export const placeholders = {
    submitButton: "submitButtonPlaceholder",
    inputsPlace: "inputsPlaceholder"
}

export const submitForm = ({
    class_,
    inputBuilders,
    submitBuilder,
    onSubmitFunc,
    formHeaderText,
    isNoBorder = false
}: ISubmitForm) => {
    const params = {
        class_: convertStyles2Strings(
            [styles],
            isNoBorder ? "form_no_border" : undefined,
            class_
        ),
        formHeaderText,
        ...placeholders
    }
    const content = string2DomElement(submitFormTemplate(params))
    const submitButtonsDiv = selectPlaceholder(
        content,
        placeholders.submitButton
    )
    submitButtonsDiv.appendChild(submitBuilder())

    const inputsDiv = selectPlaceholder(content, placeholders.inputsPlace)
    for (const inputBuilder of inputBuilders) {
        inputsDiv.appendChild(inputBuilder())
    }
    if (onSubmitFunc) content.addEventListener("submit", onSubmitFunc)
    return content
}

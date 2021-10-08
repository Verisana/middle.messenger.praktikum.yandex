import styles from "./submitForm.css"
import submitFormTemplate from "./submitForm.hbs"
import { convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { ISubmitFormParams } from "./types"
import { Block } from "../block"

export class SubmitForm extends Block {
    constructor(params: ISubmitFormParams) {
        const { props, settings = {} } = params
        settings.isNoBorder =
            settings.isNoBorder === undefined ? false : settings.isNoBorder
        props.rootClass = convertStylesToStrings(
            [styles],
            settings.isNoBorder ? "form_no-border" : undefined,
            props.rootClass
        )
        props.errorClass = convertStylesToStrings(
            [styles],
            "form__authorization-error",
            props.errorClass
        )
        super(params)
    }

    showError() {
        const { content } = this

        if (content !== null) {
            const errorText = content.querySelector("#form-authorization-error")
            errorText?.classList.add(styles["form__authorization-error_show"])
        } else {
            throw new Error("Can not show error, because content is null")
        }
    }

    render(): HTMLElement {
        return compileToDom(submitFormTemplate, this.props)
    }
}

import styles from "./submitForm.css"
import submitFormTemplate from "./submitForm.hbs"
import { convertStyles2Strings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { ISubmitFormParams } from "./types"
import { Block } from "../block"

export class SubmitForm extends Block {
    constructor(params: ISubmitFormParams) {
        const { props, settings = {} } = params
        settings.isNoBorder =
            settings.isNoBorder === undefined ? false : settings.isNoBorder
        props.rootClass = convertStyles2Strings(
            [styles],
            settings.isNoBorder ? "form_no-border" : undefined,
            props.rootClass
        )
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(submitFormTemplate, this.props)
    }
}

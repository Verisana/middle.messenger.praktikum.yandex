import styles from "./inputField.css"
import inputFieldTemplate from "./inputField.hbs"
import { convertStyles2Strings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { IInputFieldParams } from "./types"
import { Block } from "../block"

export class InputField extends Block {
    constructor(params: IInputFieldParams) {
        const { props = {} } = params
        props.rootClass = convertStyles2Strings([styles], props.rootClass)
        props.type_ = props.type_ === undefined ? "text" : props.type_
        props.required = props.required === undefined ? false : props.required
        props.placeholder =
            props.placeholder === undefined ? " " : props.placeholder

        super(params)
    }

    render(): HTMLElement {
        return compileToDom(inputFieldTemplate, this.props)
    }
}

import styles from "./inputField.css"
import inputFieldTemplate from "./inputField.hbs"
import {
    convertStyles2Strings,
    compile2Dom,
    pushEvent
} from "../../utils/utils"
import { IInputFieldParams } from "./types"
import { Block } from "../../block"

const hideLabelIfNoValue = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
        const label = event.target.parentElement?.querySelector("label")
        if (label !== null && label !== undefined) {
            if (event.target.value.length > 0) {
                label.style.display = "none"
            } else {
                label.style.display = "block"
            }
        }
        return
    }

    throw new Error("Must bu used only on HTMLInputElement")
}

export class InputField extends Block {
    constructor(params: IInputFieldParams) {
        const { props = {} } = params
        props.rootClass = convertStyles2Strings([styles], props.rootClass)
        props.type_ = props.type_ === undefined ? "text" : props.type_
        props.required = props.required === undefined ? false : props.required
        props.placeholder =
            props.placeholder === undefined ? " " : props.placeholder

        const { events = {} } = props
        pushEvent(events, "keyup", hideLabelIfNoValue)
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(inputFieldTemplate, this.props)
    }
}

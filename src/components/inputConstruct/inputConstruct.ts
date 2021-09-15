import styles from "./inputConstruct.css"
import inputConstructTemplate from "./inputConstruct.hbs"
import {
    convertStyles2Strings,
    compile2Dom,
    pushEvent
} from "../../utils/utils"
import { IInputConstructParams } from "./types"
import { Block } from "../../block"
import { IInputFieldProps } from "../inputField"

const hideLabelIfNoValue = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
        const label = event.target.parentElement?.querySelector("label")
        if (label !== null && label !== undefined) {
            console.log(event.target.value.length)
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

export class InputConstruct extends Block {
    constructor(params: IInputConstructParams) {
        const { props } = params
        props.barClass = convertStyles2Strings([styles], "bar", props.barClass)
        props.rootClass = convertStyles2Strings(
            [styles],
            "inputDiv_default",
            props.rootClass
        )
        props.br = props.br === undefined ? false : props.br
        props.label =
            props.label === undefined
                ? undefined
                : {
                      text: props.label.text,
                      class: convertStyles2Strings([styles], props.label.class)
                  }
        const inputFieldProps = props.InputField.props as IInputFieldProps
        const inputEvents =
            inputFieldProps.events === undefined ? {} : inputFieldProps.events

        pushEvent(inputEvents, "keyup", hideLabelIfNoValue)

        // Обязательно нужно переприсвоить, чтобы затригерились изменения
        inputFieldProps.events = inputEvents
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(inputConstructTemplate, this.props)
    }
}

import styles from "./inputField.css"
import inputFieldTemplate from "./inputField.hbs"
import { convertStyles2Strings, compile2Dom } from "../../utils/utils"
import { IInputFieldParams } from "./types"
import { Block } from "../../block"

export class InputField extends Block {
    constructor(params: IInputFieldParams) {
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
        props.inputPart =
            props.inputPart === undefined
                ? undefined
                : {
                      class: convertStyles2Strings(
                          [styles],
                          props.inputPart.class
                      ),
                      type:
                          props.inputPart.type === undefined
                              ? "text"
                              : props.inputPart.type,
                      required:
                          props.inputPart.required === undefined
                              ? false
                              : props.inputPart.required,
                      pattern: props.inputPart.pattern,
                      placeholder: props.inputPart.placeholder,
                      name: props.inputPart.name
                  }
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(inputFieldTemplate, this.props)
    }
}

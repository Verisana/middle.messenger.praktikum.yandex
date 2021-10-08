import styles from "./inputConstruct.css"
import inputConstructTemplate from "./inputConstruct.hbs"
import { convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { IInputConstructParams } from "./types"
import { Block } from "../block"

export class InputConstruct extends Block {
    constructor(params: IInputConstructParams) {
        const { props } = params
        props.barClass = convertStylesToStrings(
            [styles],
            "input-construct__bar",
            props.barClass
        )
        props.rootClass = convertStylesToStrings(
            [styles],
            "input-construct",
            props.rootClass
        )
        props.br = props.br === undefined ? false : props.br
        props.label =
            props.label === undefined
                ? undefined
                : {
                      text: props.label.text,
                      class: convertStylesToStrings([styles], props.label.class)
                  }
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(inputConstructTemplate, this.props)
    }
}

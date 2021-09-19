import styles from "./inputConstruct.css"
import inputConstructTemplate from "./inputConstruct.hbs"
import { convertStyles2Strings, compile2Dom } from "../../utils/utils"
import { IInputConstructParams } from "./types"
import { Block } from "../block"

export class InputConstruct extends Block {
    constructor(params: IInputConstructParams) {
        const { props } = params
        props.barClass = convertStyles2Strings(
            [styles],
            "input-construct__bar",
            props.barClass
        )
        props.rootClass = convertStyles2Strings(
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
                      class: convertStyles2Strings([styles], props.label.class)
                  }
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(inputConstructTemplate, this.props)
    }
}

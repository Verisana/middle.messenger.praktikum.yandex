import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { convertStyles2Strings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { IButtonParams } from "./types"
import { Block } from "../block"

export class Button extends Block {
    constructor(params: IButtonParams) {
        const { props } = params
        props.type_ = props.type_ === undefined ? "button" : props.type_
        props.rootClass = convertStyles2Strings(
            [styles],
            "button",
            props.rootClass
        )
        props.imgStyle = convertStyles2Strings([styles], props.imgStyle)
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(buttonTemplate, this.props)
    }
}

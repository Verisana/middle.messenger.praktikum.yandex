import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { IButtonParams } from "./types"
import { Block } from "../block"

export class Button extends Block {
    constructor(params: IButtonParams) {
        const { props } = params
        props.type_ = props.type_ === undefined ? "button" : props.type_
        props.rootClass = convertStylesToStrings(
            [styles],
            "button",
            props.rootClass
        )
        props.imgStyle = convertStylesToStrings([styles], props.imgStyle)
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(buttonTemplate, this.props)
    }
}

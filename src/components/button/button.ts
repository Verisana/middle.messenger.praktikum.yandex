import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { compile2Dom, convertStyles2Strings } from "../../utils/utils"
import { IButtonParams } from "./types"
import { Block } from "../../block"

export class Button extends Block {
    constructor(params: IButtonParams) {
        const { props } = params
        props.type_ = props.type_ === undefined ? "button" : props.type_
        props.class_ = convertStyles2Strings([styles], "btn", props.class_)
        props.imgStyle =
            props.imgStyle === undefined
                ? convertStyles2Strings([styles], props.imgStyle)
                : undefined
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(buttonTemplate, this.props)
    }
}

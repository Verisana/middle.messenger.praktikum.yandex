import styles from "./button.css"
import { convertStylesToStrings } from "../../utils/utils"
import { IButtonParams } from "./types"
import { Block, Props } from "../block"

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

    render(): [string, Props] {
        return [
            /*html*/ `
            <button type="{{type_}}" class="{{rootClass}}">
                {{#if imgSrc}}<img
                    src="{{imgSrc}}"
                    class="{{imgStyle}}"
                />{{else}}{{text}}
                {{/if}}
            </button>
        `,
            this.props
        ]
    }
}

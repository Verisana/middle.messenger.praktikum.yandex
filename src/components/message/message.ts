import styles from "./message.css"
import messageTemplate from "./message.hbs"
import { convertStyles2Strings, compile2Dom } from "../../utils/utils"
import { IMessageParams } from "./types"
import { Block } from "../../block"

export class Message extends Block {
    constructor(params: IMessageParams) {
        const { props } = params
        props.rootClass = convertStyles2Strings(
            [styles],
            "message",
            props.rootClass
        )
        props.timeClass = convertStyles2Strings(
            [styles],
            "message__time_open",
            props.timeClass
        )
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(messageTemplate, this.props)
    }
}

import styles from "./sideChatBar.css"
import sideChatBarTemplate from "./sideChatBar.hbs"
import { Block } from "../../components/block"
import { compile2Dom, convertStyles2Strings } from "../../utils/utils"
import { ISideChatBarParams } from "./types"

export class SideChatBar extends Block {
    constructor(params: ISideChatBarParams) {
        const { props } = params
        props.rootClass = convertStyles2Strings(
            [styles],
            "side-chat-bar",
            props.rootClass
        )
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(sideChatBarTemplate, this.props)
    }
}

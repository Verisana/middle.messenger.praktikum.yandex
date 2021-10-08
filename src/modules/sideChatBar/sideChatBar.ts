import styles from "./sideChatBar.css"
import sideChatBarTemplate from "./sideChatBar.hbs"
import { Block } from "../../components/block"
import { convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { ISideChatBarParams } from "./types"

export class SideChatBar extends Block {
    constructor(params: ISideChatBarParams) {
        const { props } = params
        props.rootClass = convertStylesToStrings(
            [styles],
            "side-chat-bar",
            props.rootClass
        )
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(sideChatBarTemplate, this.props)
    }
}

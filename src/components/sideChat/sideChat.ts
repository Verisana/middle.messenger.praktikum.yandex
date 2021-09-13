import styles from "./sideChat.css"
import sideCHatTemplate from "./sideChat.hbs"
import layoutStyles from "../../layout/layout.css"
import { convertStyles2Strings, compile2Dom } from "../../utils/utils"
import { defaultAvatar } from "../../consts"
import { Block } from "../../block"
import { ISideChatParams } from "./types"

export class SideChat extends Block {
    constructor(params: ISideChatParams) {
        const { props } = params
        props.rootClass = convertStyles2Strings(
            [styles],
            "sideChat__main",
            props.rootClass
        )
        props.avatarSrc =
            props.avatarSrc === undefined ? defaultAvatar : props.avatarSrc
        props.imgStyles = convertStyles2Strings(
            [layoutStyles],
            "img__avatar_small"
        )
        super(params)
    }
    // Добавить slice message
    // messageElement.textContent =
    //     textContent !== null ? textContent.slice(0, maxMessageLength) : null

    render(): HTMLElement {
        return compile2Dom(sideCHatTemplate, this.props)
    }
}

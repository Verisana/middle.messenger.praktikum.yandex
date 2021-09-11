import styles from "./chatSideBar.css"
import layoutStyles from "../../layout/layout.css"
import chatSideBarTemplate from "./chatSideBar.hbs"
import { convertStyles2Strings, compile2Dom } from "../../utils/utils"
import { defaultAvatar } from "../../consts"
import { Block } from "../../block"
import { IChatSideBarParams } from "./types"

export class ChatSideBar extends Block {
    constructor(params: IChatSideBarParams) {
        const { props } = params
        props.rootClass = convertStyles2Strings(
            [styles],
            "chatSideBar_main",
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
        return compile2Dom(chatSideBarTemplate, this.props)
    }
}

import styles from "./sideChat.css"
import sideCHatTemplate from "./sideChat.hbs"
import layoutStyles from "../../layout/layout.css"
import { convertStyles2Strings, compile2Dom } from "../../utils/utils"
import { defaultAvatar } from "../../consts"
import { Block } from "../../components/block"
import { ISideChatParams } from "./types"

export class SideChat extends Block {
    constructor(params: ISideChatParams) {
        const { props } = params
        props.rootClass = convertStyles2Strings(
            [styles],
            "side-chat",
            props.rootClass
        )
        props.contactDivClass = convertStyles2Strings(
            [styles],
            "side-chat__contact",
            props.contactDivClass
        )
        props.contactParagraphClass = convertStyles2Strings(
            [styles],
            "side-chat__contact-text",
            props.contactParagraphClass
        )

        props.avatarSrc =
            props.avatarSrc === undefined ? defaultAvatar : props.avatarSrc
        props.imgStyles = convertStyles2Strings([layoutStyles], "avatar_small")
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(sideCHatTemplate, this.props)
    }
}

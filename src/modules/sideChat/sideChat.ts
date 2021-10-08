import styles from "./sideChat.css"
import sideChatTemplate from "./sideChat.hbs"
import layoutStyles from "../../layout/layout.css"
import { convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { defaultAvatar } from "../../consts"
import { Block } from "../../components/block"
import { ISideChatParams } from "./types"

export class SideChat extends Block {
    constructor(params: ISideChatParams) {
        const { props } = params
        props.rootClass = convertStylesToStrings(
            [styles],
            "side-chat",
            props.rootClass
        )
        props.contactDivClass = convertStylesToStrings(
            [styles],
            "side-chat__contact",
            props.contactDivClass
        )
        props.contactParagraphClass = convertStylesToStrings(
            [styles],
            "side-chat__contact-text",
            props.contactParagraphClass
        )

        props.avatarSrc =
            props.avatarSrc === undefined ? defaultAvatar : props.avatarSrc
        props.imgStyles = convertStylesToStrings([layoutStyles], "avatar_small")
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(sideChatTemplate, this.props)
    }
}

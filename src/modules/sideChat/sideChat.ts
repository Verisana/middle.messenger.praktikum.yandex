import styles from "./sideChat.css"
import sideChatTemplate from "./sideChat.hbs"
import layoutStyles from "../../layout/layout.css"
import { appendEvent, convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { defaultAvatar } from "../../consts"
import { Block } from "../../components/block"
import { ISideChatParams } from "./types"
import { globalEventBus } from "../../utils/event_bus"

export const sideChatEvents = {
    sideChatClicked: "sideChatClicked"
}

function sideChatClick(event: Event) {
    const { currentTarget } = event
    if (currentTarget !== null) {
        globalEventBus().emit(
            sideChatEvents.sideChatClicked,
            Number((currentTarget as HTMLElement).dataset.chatId)
        )
    }
}

export class SideChat extends Block {
    constructor(params: ISideChatParams) {
        const { props } = params
        props.rootClass = convertStylesToStrings(
            [styles],
            "side-chat",
            props.rootClass
        )
        props.chatDivClass = convertStylesToStrings(
            [styles],
            "side-chat__contact",
            props.chatDivClass
        )
        props.chatParagraphClass = convertStylesToStrings(
            [styles],
            "side-chat__contact-text",
            props.chatParagraphClass
        )

        props.avatarSrc =
            props.avatarSrc === undefined ? defaultAvatar : props.avatarSrc
        props.imgStyles = convertStylesToStrings([layoutStyles], "avatar_small")
        props.selected = props.selected === undefined ? false : props.selected

        props.events = appendEvent("click", sideChatClick, props.events)
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(sideChatTemplate, this.props)
    }
}

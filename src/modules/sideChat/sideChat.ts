import styles from "./sideChat.css"
import layoutStyles from "../../layout/layout.css"
import { appendEvent, convertStylesToStrings } from "../../utils/utils"
import { defaultAvatar, globalEvents } from "../../consts"
import { Block } from "../../components/block"
import { ISideChatParams, ISideChatProps } from "./types"
import { globalEventBus } from "../../utils/event_bus"
import { store } from "../../store"

function sideChatClick(event: Event) {
    const { currentTarget } = event
    if (currentTarget !== null) {
        globalEventBus().emit(
            globalEvents.sideChatClicked,
            Number((currentTarget as HTMLElement).dataset.chatId)
        )
    }
}

export function isSelectedChat(
    selected: SideChat | undefined,
    props: ISideChatProps
): boolean {
    return (
        selected !== undefined &&
        (selected.props as ISideChatProps).chatId === props.chatId
    )
}

export class SideChat extends Block {
    constructor(params: ISideChatParams) {
        const { props } = params
        const selected = store.select("selectedChat") as SideChat | undefined

        props.rootClass = convertStylesToStrings(
            [styles],
            "side-chat",
            props.rootClass,
            isSelectedChat(selected, props) ? "side-chat_select" : undefined
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

        if (isSelectedChat(selected, props)) {
            props.selected = true
        }

        props.events = appendEvent("click", sideChatClick, props.events)
        super(params)

        if (isSelectedChat(selected, props)) {
            store.setValue("selectedChat", this)
        }
    }

    render(): HTMLElement {
        return this._compile(
            /*html*/ `
            <div
                data-message-is-read="{{messageIsRead}}"
                data-chat-id="{{chatId}}"
                class="{{rootClass}}"
            >
                <img class="{{imgStyles}}" src="{{avatarSrc}}" />
                <div>
                    <div class="{{chatDivClass}}">
                        <p class="{{chatParagraphClass}}">
                            {{chatTitle}}
                        </p>
                        {{{Time}}}
                    </div>
                    {{{Message}}}
                </div>
            </div>
        `,
            this.props
        )
    }
}

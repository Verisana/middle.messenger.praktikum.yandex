import styles from "./sideChat.css"
import layoutStyles from "../../layout/layout.css"
import { appendEvent, convertStylesToStrings } from "../../utils/utils"
import { defaultAvatar, globalEvents } from "../../consts"
import { Block, BlockParams } from "../../components/block"
import { ISideChatProps } from "./types"
import { globalEventBus } from "../../utils/event_bus"
import { store } from "../../store"
import { IChatsResponse } from "../../api"

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
    selected: IChatsResponse | undefined,
    props: ISideChatProps
): boolean {
    return selected !== undefined && Number(selected.id) === props.chatId
}

// Этому здесь вообще не место, но если вытащить, образуется циклический импорт
// Чтобы это предотвратить, надо мне ее переработать. Пока не успеваю, поэтому
// оставил тут
export function getSelectedSideChat(
    sideChats: SideChat[]
): IChatsResponse | undefined {
    const selected = sideChats.filter((sideChat) => {
        if (sideChat.props.selected === true) {
            return true
        }
        return false
    })
    if (selected.length > 1) {
        throw new Error(
            "Received two or more selected objects. Something is wrong"
        )
    } else if (selected.length !== 0) {
        return {
            id: String(selected[0].props.chatId),
            avatar:
                selected[0].props.avatarSrc === undefined
                    ? ""
                    : selected[0].props.avatarSrc,
            title: selected[0].props.chatTitle,
            unread_count: 0,
            last_message: {
                user: {
                    login: selected[0].props.Message.props.senderName,
                    first_name: "",
                    second_name: "",
                    email: "",
                    phone: "",
                    avatar: ""
                },
                time:
                    selected[0].props.Message.props.Time?.props.timeMachine ===
                    undefined
                        ? ""
                        : selected[0].props.Message.props.Time?.props
                              .timeMachine,
                timeHuman:
                    selected[0].props.Message.props.Time?.props.timeHuman ===
                    undefined
                        ? ""
                        : selected[0].props.Message.props.Time?.props.timeHuman,
                content: selected[0].props.Message.props.text
            }
        }
    }
    return undefined
}

export class SideChat extends Block<ISideChatProps> {
    constructor(params: BlockParams<ISideChatProps>) {
        const { props } = params
        const selected = store.select("selectedChat") as
            | IChatsResponse
            | undefined

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
            store.setValue("selectedChat", getSelectedSideChat([this]))
        }
    }

    render(): [string, ISideChatProps] {
        return [
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
        ]
    }
}

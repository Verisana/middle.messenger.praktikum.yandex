import styles from "./sideChatBar.css"
import sideChatStyles from "../sideChat/sideChat.css"
import { Block, BlockParams } from "../../components/block"
import { convertStylesToStrings } from "../../utils/utils"
import { ISideChatBarProps } from "./types"
import { SideChat, getSelectedSideChat } from "../sideChat"
import { globalEventBus } from "../../utils/event_bus"
import { messagesController } from "../../controllers"
import { globalEvents } from "../../consts"
import { store } from "../../store"
import { constructSideChats } from "../../controllers/utils"

export class SideChatBar extends Block<ISideChatBarProps> {
    constructor(params: BlockParams<ISideChatBarProps>) {
        const { props } = params
        props.rootClass = convertStylesToStrings(
            [styles],
            "side-chat-bar",
            props.rootClass
        )
        super(params)
        globalEventBus().on(
            globalEvents.sideChatClicked,
            this.sideChatClick.bind(this)
        )
        globalEventBus().on(
            globalEvents.sideChatsUpdated,
            this.sideChatUpdated.bind(this)
        )
    }

    sideChatClick(id: number) {
        this.selectSideChat(id)
        const selected = getSelectedSideChat(this.props.SideChats as SideChat[])
        store.setValue("selectedChat", selected)
        return messagesController.open(selected)
    }

    sideChatUpdated() {
        let sideChats = constructSideChats()
        const searchQuery = store.select("chatsSearchQuery") as
            | string
            | undefined

        if (searchQuery !== undefined) {
            sideChats = sideChats.filter((value) => {
                const messageProps = value.props.Message.props
                return (
                    value.props.chatTitle.includes(searchQuery) ||
                    String(value.props.chatId).includes(searchQuery) ||
                    messageProps.text.includes(searchQuery)
                )
            })
            store.setValue("chatsSearchQuery", undefined)
        }
        this.props.SideChats = sideChats
    }

    selectSideChat(id: number) {
        const sideChats = this.props.SideChats as SideChat[]
        const selectStyle = sideChatStyles["side-chat_select"]
        for (const sideChat of sideChats) {
            if (typeof sideChat.props.rootClass === "string") {
                const currentStyles = new Set(
                    sideChat.props.rootClass.split(" ")
                )
                if (sideChat.props.chatId !== id) {
                    sideChat.props.selected = false
                    currentStyles.delete(selectStyle)
                } else {
                    sideChat.props.selected = true
                    currentStyles.add(selectStyle)
                }
                sideChat.props.rootClass = Array.from(currentStyles).join(" ")
            } else {
                throw new Error("rootClass always must be string")
            }
        }
    }

    render(): [string, ISideChatBarProps] {
        return [
            /*html*/ `
            <div class="{{rootClass}}">
                {{{SearchBar}}}
                <div>
                    {{{ChatDeleteButton}}}
                    {{{ChatCreateButton}}}
                </div>
                {{#each SideChats}}
                    {{{this}}}
                {{/each}}
            </div>
        `,
            this.props
        ]
    }
}

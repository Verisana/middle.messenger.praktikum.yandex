import styles from "./sideChatBar.css"
import sideChatStyles from "../sideChat/sideChat.css"
import { Block } from "../../components/block"
import { convertStylesToStrings } from "../../utils/utils"
import { ISideChatBarParams } from "./types"
import { ISideChatProps, SideChat } from "../sideChat"
import { globalEventBus } from "../../utils/event_bus"
import { messagesController } from "../../controllers"
import { getSelectedSideChat } from "../../pages/messenger/utils"
import { globalEvents } from "../../consts"
import { store } from "../../store"

export class SideChatBar extends Block {
    constructor(params: ISideChatBarParams) {
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
    }

    sideChatClick(id: number) {
        this.selectSideChat(id)
        const selected = getSelectedSideChat(this.props.SideChats as SideChat[])
        store.setValue("selectedChat", selected)
        return messagesController.open(selected)
    }

    selectSideChat(id: number) {
        const sideChats = this.props.SideChats as SideChat[]
        const selectStyle = sideChatStyles["side-chat_select"]
        for (const sideChat of sideChats) {
            const props = sideChat.props as ISideChatProps
            if (typeof props.rootClass === "string") {
                const currentStyles = new Set(props.rootClass.split(" "))
                if (props.chatId !== id) {
                    props.selected = false
                    currentStyles.delete(selectStyle)
                } else {
                    props.selected = true
                    currentStyles.add(selectStyle)
                }
                props.rootClass = Array.from(currentStyles).join(" ")
            } else {
                throw new Error("rootClass always must be string")
            }
        }
    }

    render(): HTMLElement {
        return this._compile(
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
        )
    }
}

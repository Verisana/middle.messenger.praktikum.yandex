import { Props } from "../../components/block"
import { Button } from "../../components/button"
import { SubmitForm } from "../../components/submitForm"
import { SideChat } from "../sideChat/sideChat"

export interface ISideChatBarProps extends Props {
    SideChats: SideChat[]
    ChatCreateButton: Button
    ChatDeleteButton: Button
    SearchBar: SubmitForm
    rootClass?: string | string[]
}

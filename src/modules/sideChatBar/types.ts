import { BlockParams, Props } from "../../components/block"
import { Button } from "../../components/button"
import { SearchBar } from "../searchBar"
import { SideChat } from "../sideChat/sideChat"

export interface ISideChatBarProps extends Props {
    SideChats: SideChat[]
    ChatCreateButton: Button
    ChatDeleteButton: Button
    rootClass?: string | string[]
    SearchBar?: SearchBar
}

export interface ISideChatBarParams extends BlockParams {
    props: ISideChatBarProps
}

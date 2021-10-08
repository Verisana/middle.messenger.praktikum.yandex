import { BlockParams, Props } from "../../components/block"
import { SearchBar } from "../searchBar"
import { SideChat } from "../sideChat/sideChat"

export interface ISideChatBarProps extends Props {
    SideChats: SideChat[]
    rootClass?: string | string[]
    SearchBar?: SearchBar
}

export interface ISideChatBarParams extends BlockParams {
    props: ISideChatBarProps
}

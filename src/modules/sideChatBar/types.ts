import { BlockParams, Props } from "../../components/block"
import { SideChat } from "../sideChat/sideChat"

export interface ISideChatBarProps extends Props {
    SideChats: SideChat[]
    rootClass?: string | string[]
}

export interface ISideChatBarParams extends BlockParams {
    props: ISideChatBarProps
}

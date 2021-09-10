import { BlockParams, Props } from "../../block"
import { Message } from "../message"

export interface IChatSideBarProps extends Props {
    Message: Message
    rootClass?: string | string[]
    messageIsRead?: boolean
    avatarSrc?: string
    contactName?: string
    contactId?: number
}

export interface IChatSideBarParams extends BlockParams {
    props: IChatSideBarProps
}

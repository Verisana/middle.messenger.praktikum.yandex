import { BlockParams, Props } from "../../block"
import { Message } from "../message"

export interface ISideChatProps extends Props {
    Message: Message
    rootClass?: string | string[]
    messageIsRead?: boolean
    avatarSrc?: string
    contactName?: string
    contactId?: number
}

export interface ISideChatParams extends BlockParams {
    props: ISideChatProps
}

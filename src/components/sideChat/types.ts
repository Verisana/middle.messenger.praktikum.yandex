import { BlockParams, Props } from "../block"
import { Message } from "../message"
import { TimeInfo } from "../timeInfo"

export interface ISideChatProps extends Props {
    Message: Message
    rootClass?: string | string[]
    messageIsRead?: boolean
    avatarSrc?: string
    contactName?: string
    contactId?: number
    Time?: TimeInfo
    contactDivClass?: string | string[]
    contactParagraphClass?: string | string[]
}

export interface ISideChatParams extends BlockParams {
    props: ISideChatProps
}

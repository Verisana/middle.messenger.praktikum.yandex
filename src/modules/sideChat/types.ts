import { BlockParams, Props } from "../../components/block"
import { Message } from "../../components/message"
import { TimeInfo } from "../../components/timeInfo"

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

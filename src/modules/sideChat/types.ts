import { Props } from "../../components/block"
import { Message } from "../../components/message"
import { TimeInfo } from "../../components/timeInfo"

export interface ISideChatProps extends Props {
  Message: Message
  chatId: number
  chatTitle: string
  rootClass?: string | string[]
  messageIsRead?: boolean
  avatarSrc?: string
  Time?: TimeInfo
  chatDivClass?: string | string[]
  chatParagraphClass?: string | string[]
  selected?: boolean
}

import { Props, BlockParams, BlockSettings } from "../block"
import { TimeInfo } from "../timeInfo"

export interface IMessageProps extends Props {
  text: string
  senderName: string
  senderId?: number
  rootClass?: string | string[]
  Time?: TimeInfo
}

export interface IMessageSettings extends BlockSettings {
  maxTextLength?: number
}

export interface IMessageParams extends BlockParams<IMessageProps> {
  settings?: IMessageSettings
}

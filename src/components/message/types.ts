import { Props, BlockParams, BlockSettings } from "../block"
import { TimeInfo } from "../timeInfo"

export interface IMessageSettings extends BlockSettings {
    maxTextLength?: number
}

export interface IMessageProps extends Props {
    messageId: number
    text: string

    // Временно. Вероятнее всего здесь должен быть какой-то Sender объект
    sender: string
    rootClass?: string | string[]
    Time?: TimeInfo
}

export interface IMessageParams extends BlockParams {
    props: IMessageProps
    settings?: IMessageSettings
}

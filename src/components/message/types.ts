import { Props, BlockParams } from "../../block"

export interface IMessageProps extends Props {
    messageId: number
    text: string

    // Временно. Вероятнее всего здесь должен быть какой-то Sender объект
    sender: string
    timeMachine: string
    timeHuman?: string
    rootClass?: string | string[]
}

export interface IMessageParams extends BlockParams {
    props: IMessageProps
}

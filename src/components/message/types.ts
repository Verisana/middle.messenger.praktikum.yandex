export interface IMessage {
    messageId: number
    text: string

    // Временно. Вероятнее всего здесь должен быть какой-то Sender объект
    sender: string
    timeMachine: string
    timeHuman?: string
    classList?: string | string[]
}

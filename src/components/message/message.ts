import styles from "./message.css"
import messageTemplate from "./message.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils"
import { IMessage } from "./types"

export const message = ({
    messageId,
    text,
    sender,
    timeMachine,
    timeHuman,
    classList
}: IMessage) => {
    const params = {
        class_: convertStyles2Strings([styles], "message", classList),
        timeMachine,
        timeHuman,
        messageId,
        sender,
        text
    }
    return string2DomElement(messageTemplate(params))
}

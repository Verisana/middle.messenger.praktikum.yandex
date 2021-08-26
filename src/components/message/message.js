import styles from "./message.css"
import messageTemplate from "./message.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"

export const message = ({ messageId, text, sender, timeMachine, timeHuman, classList } = {}) => {
    classList = classList === undefined ? [] : classList
    classList.push("message")
    const params = {
        class_: convertStyles2Strings(styles, classList),
        timeMachine,
        timeHuman,
        messageId,
        sender,
        text
    }
    return string2DomElement(messageTemplate(params))
}
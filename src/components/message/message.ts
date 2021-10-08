import styles from "./message.css"
import messageTemplate from "./message.hbs"
import { convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { IMessageParams, IMessageProps } from "./types"
import { Block } from "../block"

export class Message extends Block {
    private _maxMessageLength?: number

    constructor(params: IMessageParams) {
        const { props, settings = {} } = params

        props.rootClass = convertStylesToStrings(
            [styles],
            "message",
            props.rootClass
        )
        props.text = Message._sliceMessageText(
            props.text,
            settings?.maxTextLength
        )
        super(params)
        this._maxMessageLength = settings?.maxTextLength
    }

    private static _sliceMessageText(text: string, maxLength?: number): string {
        if (maxLength !== undefined && text.length > maxLength) {
            return `${text.slice(0, maxLength)}...`
        }
        return text
    }

    render(): HTMLElement {
        const props = this.props as IMessageProps
        return compileToDom(messageTemplate, {
            ...props,
            text: Message._sliceMessageText(props.text, this._maxMessageLength)
        })
    }
}

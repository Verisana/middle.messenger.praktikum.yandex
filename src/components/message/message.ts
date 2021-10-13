import styles from "./message.css"
import { convertStylesToStrings } from "../../utils/utils"
import { IMessageParams, IMessageProps } from "./types"
import { Block } from "../block"

export class Message extends Block<IMessageProps> {
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

    render(): [string, IMessageProps] {
        const propsCopy = {
            ...this.props,
            text: Message._sliceMessageText(
                this.props.text,
                this._maxMessageLength
            )
        }
        return [
            /*html*/ `
            <div
                class="{{rootClass}}"
                {{#if senderId}}data-sender-id={{senderId}}{{/if}}
                data-sender-name={{senderName}}
            >
                <p>
                    {{text}}
                </p>
                {{{Time}}}
            </div>
        `,
            propsCopy
        ]
    }
}

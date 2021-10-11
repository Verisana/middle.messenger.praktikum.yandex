import styles from "./inputField.css"
import { convertStylesToStrings } from "../../utils/utils"
import { IInputFieldParams } from "./types"
import { Block } from "../block"

export class InputField extends Block {
    constructor(params: IInputFieldParams) {
        const { props = {} } = params
        props.rootClass = convertStylesToStrings([styles], props.rootClass)
        props.type_ = props.type_ === undefined ? "text" : props.type_
        props.required = props.required === undefined ? false : props.required
        props.placeholder =
            props.placeholder === undefined ? " " : props.placeholder

        super(params)
    }

    render(): HTMLElement {
        return this._compile(
            /*html*/ `
            <input
                class="{{rootClass}}"
                type="{{type_}}"
                {{#if required}}required{{/if}}
                {{#if pattern}}pattern="{{pattern}}"{{/if}}
                placeholder="{{placeholder}}"
                name={{name}}
                {{#if value}}value="{{value}}"{{/if}}
                {{#if accept}}accept="{{accept}}"{{/if}}
            />
        `,
            this.props
        )
    }
}

import styles from "./inputConstruct.css"
import { convertStylesToStrings } from "../../utils/utils"
import { IInputConstructProps } from "./types"
import { Block, BlockParams } from "../block"

export class InputConstruct extends Block<IInputConstructProps> {
    constructor(params: BlockParams<IInputConstructProps>) {
        const { props } = params
        props.barClass = convertStylesToStrings(
            [styles],
            "input-construct__bar",
            props.barClass
        )
        props.rootClass = convertStylesToStrings(
            [styles],
            "input-construct",
            props.rootClass
        )
        props.br = props.br === undefined ? false : props.br
        props.label =
            props.label === undefined
                ? undefined
                : {
                      text: props.label.text,
                      class: convertStylesToStrings([styles], props.label.class)
                  }
        super(params)
    }

    render(): [string, IInputConstructProps] {
        return [
            /*html*/ `
            <div class="{{rootClass}}">
                {{{InputField}}}
                <p>{{validationErrorText}}</p>
                <span class="{{barClass}}"></span>
                {{#if label.text}}
                    <label class="{{label.class}}">
                        {{label.text}}
                    </label>
                {{/if}}
                {{#if br}}
                    <br />
                {{/if}}
            </div>
        `,
            this.props
        ]
    }
}

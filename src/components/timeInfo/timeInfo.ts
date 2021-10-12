import styles from "./timeInfo.css"
import { Block, Props } from "../block"
import { convertStylesToStrings } from "../../utils/utils"
import { ITimeInfoParams } from "./types"

export class TimeInfo extends Block {
    constructor(params: ITimeInfoParams) {
        const { props } = params
        props.rootClass = convertStylesToStrings([styles], props.rootClass)
        super(params)
    }

    render(): [string, Props] {
        return [
            /*html*/ `
            <time class="{{rootClass}}" datetime={{timeMachine}}>
                {{#if timeHuman}}
                    {{timeHuman}}
                {{else}}
                    {{timeMachine}}
                {{/if}}
            </time>
        `,
            this.props
        ]
    }
}

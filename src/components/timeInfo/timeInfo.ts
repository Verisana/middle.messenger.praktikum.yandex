import styles from "./timeInfo.css"
import { Block, BlockParams } from "../block"
import { convertStylesToStrings } from "../../utils/utils"
import { ITimeInfoProps } from "./types"

export class TimeInfo extends Block<ITimeInfoProps> {
  constructor(params: BlockParams<ITimeInfoProps>) {
    const { props } = params
    props.rootClass = convertStylesToStrings([styles], props.rootClass)
    super(params)
  }

  render(): [string, ITimeInfoProps] {
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

import styles from "./timeInfo.css"
import timeInfoTemplate from "./timeInfo.hbs"
import { Block } from "../../block"
import { compile2Dom, convertStyles2Strings } from "../../utils/utils"
import { ITimeInfoParams } from "./types"

export class TimeInfo extends Block {
    constructor(params: ITimeInfoParams) {
        const { props } = params
        props.rootClass = convertStyles2Strings([styles], props.rootClass)
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(timeInfoTemplate, this.props)
    }
}

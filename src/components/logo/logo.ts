import styles from "./logo.css"
import logoTemplate from "./logo.hbs"
import { compileToDom } from "../../utils/dom_utils"
import { Block } from "../block"
import { ILogoParams } from "./types"
import { appendEvent, convertStylesToStrings } from "../../utils/utils"
import { urlSlugs } from "../../consts"
import { routerFactory } from "../../router"

const router = routerFactory()

export class Logo extends Block {
    constructor(params: ILogoParams) {
        const { props } = params
        if (props.rootClass === undefined) {
            props.rootClass = convertStylesToStrings([styles], "logo")
        } else {
            props.rootClass = convertStylesToStrings(
                [styles],
                "logo",
                props.rootClass
            )
        }
        if (props.events === undefined) {
            props.events = {}
        }
        appendEvent(
            props.events,
            "click",
            router.go.bind(router, urlSlugs.home)
        )
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(logoTemplate, this.props)
    }
}

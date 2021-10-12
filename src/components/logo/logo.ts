import styles from "./logo.css"
import { Block, Props } from "../block"
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
        props.events = appendEvent(
            "click",
            router.go.bind(router, urlSlugs.home),
            props.events
        )
        super(params)
    }

    render(): [string, Props] {
        return [
            /*html*/ `
            <p class={{rootClass}}>
                Random Voice Companion
            </p>
        `,
            this.props
        ]
    }
}

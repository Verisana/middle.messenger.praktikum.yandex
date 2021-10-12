import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import { Block, Props } from "../block"
import { IFooterParams } from "./types"

export class Footer extends Block {
    constructor() {
        const params: IFooterParams = {
            props: {
                contentClass: layoutStyles.content
            }
        }

        super(params)
    }

    render(): [string, Props] {
        return [
            /*html*/ `
            <footer>
                <div className={{contentClass}}>
                    <p>
                        © 2021. Random Voice Companion
                    </p>
                </div>
            </footer>
        `,
            this.props
        ]
    }
}

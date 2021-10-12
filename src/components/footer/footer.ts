import "./footer.css"
import layoutStyles from "../../layout/layout.css"
import { Block, BlockParams } from "../block"
import { IFooterProps } from "./types"

export class Footer extends Block<IFooterProps> {
    constructor() {
        const params: BlockParams<IFooterProps> = {
            props: {
                contentClass: layoutStyles.content
            }
        }

        super(params)
    }

    render(): [string, IFooterProps] {
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

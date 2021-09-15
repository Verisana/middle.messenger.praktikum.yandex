import { BlockParams, Props } from "../block"
import { Button } from "../button"

export interface IFooterProps extends Props {
    contentClass: string
    LinkButtons: Button[]
}

export interface IFooterParams extends BlockParams {
    props: IFooterProps
}

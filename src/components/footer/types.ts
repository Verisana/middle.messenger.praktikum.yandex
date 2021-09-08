import { BlockParams, Props } from "../../block"
import { Button } from "../button"

export interface IFooterProps extends Props {
    contentClass: string
    linkButtons: Button[]
}

export interface IFooterParams extends BlockParams {
    props: IFooterProps
}

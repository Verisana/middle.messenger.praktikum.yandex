import { BlockParams, Props } from "../block"

export interface IFooterProps extends Props {
    contentClass: string
}

export interface IFooterParams extends BlockParams {
    props: IFooterProps
}

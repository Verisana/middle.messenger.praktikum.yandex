import { BlockParams, Props } from "../../block"

export interface IButtonProps extends Props {
    text?: string
    rootClass?: string | string[]
    type_?: string
    imgSrc?: string
    imgStyle?: string | string[]
}

export interface IButtonParams extends BlockParams {
    props: IButtonProps
}

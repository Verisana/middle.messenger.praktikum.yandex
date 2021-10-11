import { BlockParams, Props } from "../block"

export interface ILogoProps extends Props {
    rootClass?: string | string[]
}

export interface ILogoParams extends BlockParams {
    props: ILogoProps
}

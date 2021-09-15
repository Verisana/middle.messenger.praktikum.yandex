import { BlockParams, Props } from "../block"

export interface ITimeInfoProps extends Props {
    timeMachine: string
    rootClass?: string | string[]
    timeHuman?: string
}

export interface ITimeInfoParams extends BlockParams {
    props: ITimeInfoProps
}

import { BlockParams, Props } from "../../block";

export interface IInputFieldProps extends Props {
    barClass?: string | string[]
    rootClass?: string | string[]
    label?: {
        text: string
        class?: string | string[]
    }
    inputPart?: {
        type: string
        class?: string | string[]
        required?: boolean
        pattern?: string
        placeholder?: string
        name?: string
    }
    br?: boolean
}

export interface IInputFieldParams extends BlockParams {
    props: IInputFieldProps
}


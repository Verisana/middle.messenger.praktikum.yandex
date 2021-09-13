import { BlockParams, Props } from "../../block"
import { InputField } from "../inputField";

export interface IInputConstructProps extends Props {
    InputField: InputField
    barClass?: string | string[]
    rootClass?: string | string[]
    label?: {
        text: string
        class?: string | string[]
    }
    br?: boolean
}

export interface IInputConstructParams extends BlockParams {
    props: IInputConstructProps
}

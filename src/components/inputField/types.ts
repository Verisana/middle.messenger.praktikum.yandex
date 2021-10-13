import { Props } from "../block"

export interface IInputFieldProps extends Props {
    type_?: string
    rootClass?: string | string[]
    required?: boolean
    pattern?: string
    placeholder?: string
    name?: string
    value?: string
    accept?: string
}

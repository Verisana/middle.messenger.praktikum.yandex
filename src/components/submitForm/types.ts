import { BlockParams, Props } from "../block"
import { BlockSettings } from "../block/types"
import { Button } from "../button"
import { InputConstruct } from "../inputConstruct"

export interface ISubmitFormProps extends Props {
    Inputs: InputConstruct[]
    SubmitButton: Button
    formHeaderText?: string
    rootClass?: string | string[]
    errorClass?: string | string[]
    errorText?: string
}

export interface ISubmitFormSettings extends BlockSettings {
    isNoBorder?: boolean
}

export interface ISubmitFormParams extends BlockParams<ISubmitFormProps> {
    settings?: ISubmitFormSettings
}

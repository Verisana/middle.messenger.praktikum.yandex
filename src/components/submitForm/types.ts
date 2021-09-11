import { BlockParams, Props } from "../../block"
import { BlockSettings } from "../../block/types"
import { Button } from "../button"
import { InputField } from "../inputField"

export interface ISubmitFormProps extends Props {
    Inputs: InputField[]
    SubmitButton: Button
    formHeaderText?: string
    rootClass?: string | string[]
}

export interface ISubmitFormSettings extends BlockSettings {
    isNoBorder?: boolean
}

export interface ISubmitFormParams extends BlockParams {
    props: ISubmitFormProps
    settings: ISubmitFormSettings
}

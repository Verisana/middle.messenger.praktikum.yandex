export interface IInputField {
    barClass?: string
    divClass?: string
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

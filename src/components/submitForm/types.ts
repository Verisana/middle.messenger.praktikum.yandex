export interface ISubmitForm {
    inputBuilders: { (): Element }[]
    submitBuilder: () => Element
    formHeaderText?: string
    class_?: string | string[]
    isNoBorder?: boolean
    onSubmitFunc?: (event: Event) => void
}

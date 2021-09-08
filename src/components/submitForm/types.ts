export interface ISubmitForm {
    inputBuilders: { (): Element }[]
    submitBuilder: () => HTMLElement
    formHeaderText?: string
    class_?: string | string[]
    isNoBorder?: boolean
    onSubmitFunc?: (event: Event) => void
}

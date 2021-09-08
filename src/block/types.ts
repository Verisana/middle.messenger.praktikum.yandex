export type Events = Record<string, (event: Event) => void>

export interface IBlockSettings {
    withInternalID: boolean
}

export type Props = {
    __id?: string
    [key: string]: unknown
}

export type TemplateCreator = (props: Props) => string

export type BlockParams = {
    events?: Events
    settings?: IBlockSettings
    props?: Props
}

export interface IMeta {
    tagName: string
    params: BlockParams
    id?: string
}

export type Events = Record<string, [EventListener]>

export type StoreMappings = Record<string, string[]>

export type BlockSettings = {
    withInternalID?: boolean
}

export type Props = {
    events?: Events
    __id?: string
    [key: string]: unknown
}

export type TemplateCreator = (props: Props) => string

export type BlockParams = {
    events?: Events
    settings?: BlockSettings
    storeMappings?: StoreMappings
    props: Props
}

export interface IMeta {
    params: BlockParams
    id?: string
}

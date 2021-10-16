import { Events } from "../../utils/types"

export type StoreMappings = Record<string, string[]>

export type BlockSettings = {
  withInternalID?: boolean
}

export type Props = {
  events?: Events
  __id?: string
  [key: string]: unknown
}

export type TemplateCreator<T> = (props: T) => string

export type BlockParams<T> = {
  events?: Events
  settings?: BlockSettings
  storeMappings?: StoreMappings
  props: T
}

export interface IMeta<T> {
  params: BlockParams<T>
  id?: string
}

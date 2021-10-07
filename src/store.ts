import { Block } from "./components/block"
import { IStoreData } from "./types"
import { EventBus } from "./utils/event_bus"
import { PlainObject } from "./utils/types"
import { get, set } from "./utils/utils"

export class Store {
    static EVENTS = {
        SDU: "state-did-update"
    }

    static __instance: Store

    // @ts-expect-error
    private _data: IStoreData

    // @ts-expect-error
    eventBus: () => EventBus

    constructor(data: IStoreData) {
        const eventBus = new EventBus()

        if (Store.__instance) {
            return Store.__instance
        }
        this._data = data
        this.eventBus = () => eventBus

        Store.__instance = this
    }

    get data(): IStoreData {
        return this._data
    }

    select(path: string): PlainObject | undefined {
        return get(this.data, path, false)
    }

    setValue(path: string, value: unknown): boolean {
        set(this.data, path, value)
        this.eventBus().emit(Block.EVENTS.STATE_SDU, path, value)
        return true
    }

    setUndefined(path: string): boolean {
        set(this.data, path, undefined)
        return true
    }
}

export const store = new Store({})

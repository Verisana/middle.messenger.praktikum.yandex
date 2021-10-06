import { UserData } from "./api/types"
import { Block } from "./components/block"
import { EventBus } from "./utils/event_bus"
import { PlainObject } from "./utils/types"
import { get, set } from "./utils/utils"

const eventBus = new EventBus()

export class Store {
    static EVENTS = {
        SDU: "state-did-update"
    }

    static __instance: Store

    // @ts-expect-error
    private _data: PlainObject

    constructor(data: PlainObject) {
        if (Store.__instance) {
            return Store.__instance
        }
        this._data = data

        Store.__instance = this
    }

    get data(): object {
        return this._data
    }

    select(path: string): PlainObject | undefined {
        return get(this.data, path)
    }

    setValue(path: string, value: unknown): boolean {
        set(this.data, path, value)
        eventBus.emit(Block.EVENTS.STATE_SDU, path, value)
        return true
    }
}

export interface IStoreData {
    user?: UserData
}

const data: IStoreData = {
    user: {
        id: "2",
        login: "loginTest",
        first_name: "Ff",
        second_name: "dF",
        phone: "3432424323",
        avatar: "/test/df.jpeg",
        email: "dfsdfs@fdfd.ru",
        display_name: "nameDisplay"
    }
}

export const store = new Store(data)

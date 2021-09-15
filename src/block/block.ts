import { v4 as uuidv4 } from "uuid"

import { Props, IMeta, BlockParams } from "./types"
import { EventBus } from "../utils/event_bus"

export abstract class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    }

    private _root: DocumentFragment | null

    private _content: HTMLElement | null

    private _meta: IMeta

    props: Props

    eventBus: () => EventBus

    constructor(params: BlockParams) {
        const eventBus = new EventBus()
        const { settings, props = {} } = params
        this._meta = {
            params
        }

        if (settings?.withInternalID) {
            this._meta.id = uuidv4()
        }
        props.__id = this._meta.id
        this.props = this._makePropsProxy(props)
        this.eventBus = () => eventBus
        this._root = null
        this._content = null
        this._registerEvents(eventBus)
        eventBus.emit(Block.EVENTS.INIT)
    }

    protected _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
    }

    protected _createResources() {
        this._root = Block._createFragmentElement()
    }

    init() {
        this._createResources()
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    protected _componentDidMount() {
        Block.componentDidMount()
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    static componentDidMount() {}

    protected _componentDidUpdate(newProps: Props) {
        const response = Block.componentDidUpdate(newProps)
        if (!response) {
            return
        }
        this._render()
    }

    static componentDidUpdate(newProps: Props): boolean {
        if (newProps !== undefined) {
            return true
        }
        return false
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }

    get root(): DocumentFragment {
        if (this._root === null) throw new Error("Element was not created")
        return this._root
    }

    get content(): HTMLElement | null {
        return this._content
    }

    protected _render() {
        const block = this.render()
        if (this._meta.params.settings?.withInternalID) {
            block.dataset.blockId = this.props.__id
        }

        this._removeEvents()

        this.root.replaceChildren(block)

        if (this._content === null) {
            this._content = block
        } else {
            this._content.replaceChildren(block)
        }
        this._addEvents()
    }

    abstract render(): HTMLElement

    _makePropsProxy(props: Props): Props {
        const that = this

        return new Proxy(props, {
            get(target: Props, prop: string): unknown {
                const value = target[prop]
                return typeof value === "function" ? value.bind(target) : value
            },
            set(target: Props, prop: string, value: unknown) {
                target[prop] = value

                that.eventBus().emit(Block.EVENTS.FLOW_CDU, target)
                return true
            },
            deleteProperty() {
                throw new Error("Нет доступа")
            }
        })
    }

    protected static _createFragmentElement(): DocumentFragment {
        return document.createDocumentFragment()
    }

    show() {
        if (this.content !== null) {
            this.content.style.display = "block"
        }
    }

    hide() {
        if (this.content !== null) {
            this.content.style.display = "none"
        }
    }

    _addEvents() {
        const { events = {} } = this.props
        Object.keys(events).forEach((eventName) => {
            for (const eventListener of events[eventName]) {
                this.content?.addEventListener(eventName, eventListener)
            }
        })
    }

    _removeEvents() {
        const { events = {} } = this.props
        Object.keys(events).forEach((eventName) => {
            for (const eventListener of events[eventName]) {
                this.content?.removeEventListener(eventName, eventListener)
            }
        })
    }
}

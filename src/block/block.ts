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

    private _element: DocumentFragment | null

    private _meta: IMeta

    props: Props

    eventBus: () => EventBus

    constructor(params: BlockParams) {
        const eventBus = new EventBus()
        const { settings = { withInternalID: false }, props = {} } = params
        this._meta = {
            params
        }

        if (settings.withInternalID) {
            this._meta.id = uuidv4()
        }
        this.props = this._makePropsProxy({ ...props, __id: this._meta.id })

        this.eventBus = () => eventBus
        this._element = null
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
        this._element = Block._createFragmentElement()
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

    protected _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = Block.componentDidUpdate(oldProps, newProps)
        if (!response) {
            return
        }
        this._render()
    }

    static componentDidUpdate(_0: Props, newProps: Props): boolean {
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

    get element(): DocumentFragment {
        if (this._element === null) throw new Error("Element was not created")
        return this._element
    }

    getContent(): HTMLElement | null {
        if (this._element === null) throw new Error("Element was not created")
        const children = this._element?.children

        if (children.length === 1) return children[0] as HTMLElement
        if (children.length === 0) return null

        throw new Error("Something wrong. There should be only one child")
    }

    protected _render() {
        const block = this.render()
        if (this._meta.params.settings?.withInternalID) {
            block.dataset.blockId = this.props.__id
        }

        this._removeEvents()
        this.element.replaceChildren(block)
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

                that.eventBus().emit(
                    Block.EVENTS.FLOW_CDU,
                    { ...target },
                    target
                )
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
        const content = this.getContent()
        if (content !== null) {
            content.style.display = "block"
        }
    }

    hide() {
        const content = this.getContent()
        if (content !== null) {
            content.style.display = "none"
        }
    }

    _addEvents() {
        const { events = {} } = this._meta.params
        Object.keys(events).forEach((eventName) => {
            this.getContent()?.addEventListener(eventName, events[eventName])
        })
    }

    _removeEvents() {
        const { events = {} } = this._meta.params
        Object.keys(events).forEach((eventName) => {
            this.getContent()?.removeEventListener(eventName, events[eventName])
        })
    }
}

import { v4 as uuidv4 } from "uuid"

import styles from "./block.css"
import { Props, IMeta, BlockParams, StoreMappings } from "./types"
import { EventBus } from "../../utils/event_bus"
import { set } from "../../utils/utils"
import { store } from "../../store"
import { BlockEvents } from "../../consts"

export abstract class Block {
    private _root: DocumentFragment | null

    private _content: HTMLElement | null

    private _meta: IMeta

    props: Props

    eventBus: () => EventBus

    storeMappings: StoreMappings

    constructor(params: BlockParams) {
        const eventBus = new EventBus()
        const { settings, props, storeMappings = {} } = params
        this._meta = {
            params
        }

        if (settings?.withInternalID) {
            this._meta.id = uuidv4()
        }
        props.__id = this._meta.id

        // Обязательно до того, как пропсы стали прокси, чтобы не перерисовывать компоненты
        this.storeMappings = storeMappings
        this._initMappingValues()
        this.props = this._makePropsProxy(props)
        this.eventBus = () => eventBus
        this._root = null
        this._content = null
        this._registerEvents(eventBus)
        eventBus.emit(BlockEvents.INIT)
    }

    protected _registerEvents(eventBus: EventBus) {
        eventBus.on(BlockEvents.INIT, this.init.bind(this))
        eventBus.on(BlockEvents.FLOW_CBM, this._componentBeforeMount.bind(this))
        eventBus.on(BlockEvents.FLOW_RENDER, this._render.bind(this))
        eventBus.on(BlockEvents.FLOW_CDM, this._componentDidMount.bind(this))
        eventBus.on(BlockEvents.FLOW_CDU, this._componentDidUpdate.bind(this))
        store
            .eventBus()
            .on(BlockEvents.STATE_SDU, this._storeDidUpdate.bind(this))
    }

    protected _createResources() {
        this._root = Block._createFragmentElement()
    }

    init() {
        this._createResources()
        this.eventBus().emit(BlockEvents.FLOW_CBM)
    }

    protected _initMappingValues() {
        for (const [storeSelector, propsSelectors] of Object.entries(
            this.storeMappings
        )) {
            const value = store.select(storeSelector)
            if (value !== undefined) {
                for (const propsSelector of propsSelectors) {
                    set(this._meta.params.props, propsSelector, value)
                }
            }
        }
    }

    protected _storeDidUpdate(selector: string, value: unknown) {
        const propsSelectors = this.storeMappings[selector]

        // Обновляем только те компоненты, в которых нашли этот селектор
        if (propsSelectors !== undefined) {
            for (const propsSelector of propsSelectors) {
                set(this.props, propsSelector, value)
            }
        }
    }

    protected _componentBeforeMount() {
        this.componentBeforeMount()
        this.eventBus().emit(BlockEvents.FLOW_RENDER)
    }

    protected _componentDidMount() {
        this.componentDidMount()
    }

    componentDidMount() {}

    componentBeforeMount() {}

    protected _componentDidUpdate(newProps: Props) {
        const response = this.componentDidUpdate(newProps)
        if (!response) {
            return
        }

        this.eventBus().emit(BlockEvents.FLOW_CBM)
    }

    componentDidUpdate(newProps: Props): boolean {
        return newProps !== undefined
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return
        }

        Object.assign(this.props, nextProps)
    }

    get root(): DocumentFragment {
        if (this._root === null) {
            throw new Error("Element was not created")
        }
        return this._root
    }

    get content(): HTMLElement | null {
        return this._content
    }

    private _cloneAttributes(target: HTMLElement, source: HTMLElement) {
        Array.from(source.attributes).forEach((attr: Attr) => {
            target.removeAttribute(attr.name)
        })

        Array.from(source.attributes).forEach((attr: Attr) => {
            if (attr.nodeValue !== null) {
                target.setAttribute(attr.nodeName, attr.nodeValue)
            }
        })
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
            this._content.replaceChildren(...Array.from(block.children))

            if (block.tagName !== this._content.tagName)
                throw new Error("You can't change _content tagName")

            this._cloneAttributes(this._content, block)
        }

        this._addEvents()

        this.eventBus().emit(BlockEvents.FLOW_CDM)
    }

    abstract render(): HTMLElement

    _makePropsProxy(props: Props): Props {
        return new Proxy(props, {
            get: (target: Props, prop: string): unknown => {
                const value = target[prop]
                return typeof value === "function" ? value.bind(target) : value
            },
            set: (target: Props, prop: string, value: unknown) => {
                target[prop] = value
                this.eventBus().emit(BlockEvents.FLOW_CDU, target)
                return true
            },
            deleteProperty: () => {
                throw new Error("Нет доступа")
            }
        })
    }

    protected static _createFragmentElement(): DocumentFragment {
        return document.createDocumentFragment()
    }

    show() {
        if (this.content !== null) {
            this.content.classList.remove(styles.hidden)
        }
    }

    hide() {
        if (this.content !== null) {
            this.content.classList.add(styles.hidden)
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

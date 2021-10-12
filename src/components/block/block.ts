import { v4 as uuidv4 } from "uuid"
import Handlebars from "handlebars"

import styles from "./block.css"
import { Props, IMeta, BlockParams, StoreMappings } from "./types"
import { EventBus } from "../../utils/event_bus"
import { set } from "../../utils/utils"
import { store } from "../../store"
import { BlockEvents } from "../../consts"

export abstract class Block {
    private _content: HTMLElement | null

    private _meta: IMeta

    private _templateFunc: () => string

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
        this._content = null
        this._registerEvents(eventBus)
        this._templateFunc = this._compileTemplate()
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

    init() {
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
        const block = this._compile()

        if (this._meta.params.settings?.withInternalID) {
            block.dataset.blockId = this.props.__id
        }

        this._removeEvents()

        if (this._content === null) {
            this._content = block
        } else {
            const children = Array.from(block.children)
            if (children.length > 0) {
                this._content.replaceChildren(...children)
            } else {
                this._content.textContent = block.textContent
            }

            if (block.tagName !== this._content.tagName)
                throw new Error("You can't change _content tagName")

            this._cloneAttributes(this._content, block)
        }

        this._addEvents()

        this.eventBus().emit(BlockEvents.FLOW_CDM)
    }

    abstract render(): [string, Props]

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

    protected _compileTemplate(): () => string {
        const [html] = this.render()
        return Handlebars.compile(html) as () => string
    }

    protected _compile(): HTMLElement {
        const props = this.render()[1]
        return Block.compileToDom(this._templateFunc, props)
    }

    static fillComponentId(
        components: Record<string, Block>,
        key: string,
        value: unknown,
        context: Props,
        isValueArray: boolean
    ) {
        if (value instanceof Block) {
            const id = uuidv4()

            const mockDomString = `<div data-content-id="${id}"></div>` // делаем заглушку
            components[id] = value // сохраняем компонент
            if (isValueArray) {
                if (context[key] === undefined) {
                    context[key] = []
                }
                // TypeScript не понимал, что у меня тут 100% будет массив, поэтому
                // пришлось вручную пробросить тип
                const contextValue = context[key] as string[]
                contextValue.push(mockDomString)
            } else {
                context[key] = mockDomString
            }
        } else {
            context[key] = value
        }
    }

    static compileToDom(
        templateFunc: (context: Props) => string,
        proxyContext: Props
    ): HTMLElement {
        const fragment = document.createElement("template")
        const components: Record<string, Block> = {}

        // Создаем дубликат массива, чтобы не триггерить CDU, когда перезаписываем
        // в пропсах mock значения
        const context: Props = {}

        for (const [key, value] of Object.entries(proxyContext)) {
            if (Array.isArray(value)) {
                for (const arrayValue of value) {
                    Block.fillComponentId(
                        components,
                        key,
                        arrayValue,
                        context,
                        true
                    )
                }
            } else {
                Block.fillComponentId(components, key, value, context, false)
            }
        }
        fragment.innerHTML = templateFunc(context)
        for (const [id, component] of Object.entries(components)) {
            const stub = fragment.content.querySelector(
                `[data-content-id="${id}"]`
            )

            // Здесь разрешено получать null, потому что шаблон может рендерить места
            // В зависимости от условий. Тогда получается, что у нас может быть компонент
            // но места под него нет в текущем состоянии.
            if (stub !== null) {
                if (component.content !== null) {
                    stub.replaceWith(component.content)
                } else {
                    console.warn("Content can not bu nulled")
                }
            }
        }
        return fragment.content.firstElementChild as HTMLElement
    }
}

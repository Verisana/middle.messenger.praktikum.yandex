import { v4 as uuidv4 } from "uuid"

import { Block, Props } from "../components/block"

export const render = (query: string, block: Block): Element => {
    const root = document.querySelector(query)
    if (root === null) throw new Error("Check your query")

    if (block.content !== null) {
        root.replaceWith(block.content)
    } else {
        throw new Error("Can not render. No content available")
    }
    return root
}

const fillComponentId = (
    components: Record<string, Block>,
    key: string,
    value: unknown,
    context: Props,
    isValueArray: boolean
) => {
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

export const compileToDom = (
    templateFunc: (context: Props) => string,
    proxyContext: Props
): HTMLElement => {
    const fragment = document.createElement("template")
    const components: Record<string, Block> = {}

    // Создаем дубликат массива, чтобы не триггерить CDU, когда перезаписываем
    // в пропсах mock значения
    const context: Props = {}

    for (const [key, value] of Object.entries(proxyContext)) {
        if (Array.isArray(value)) {
            for (const arrayValue of value) {
                fillComponentId(components, key, arrayValue, context, true)
            }
        } else fillComponentId(components, key, value, context, false)
    }
    fragment.innerHTML = templateFunc(context)
    for (const [id, component] of Object.entries(components)) {
        const stub = fragment.content.querySelector(`[data-content-id="${id}"]`)

        // Здесь разрешено получать null, потому что шаблон может рендерить места
        // В зависимости от условий. Тогда получается, что у нас может быть компонент
        // но места под него нет в текущем состоянии.
        if (stub !== null) {
            if (component.content === null)
                throw new Error("Content can not bu nulled")
            stub.replaceWith(component.content)
        }
    }
    return fragment.content.firstChild as HTMLElement
}

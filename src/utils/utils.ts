import { v4 as uuidv4 } from "uuid"

import classNames from "classnames"
import { Block, Props } from "../block"

export const string2DomElement = (toParse: string): HTMLElement => {
    const parsed = new DOMParser().parseFromString(toParse, "text/html")
    return parsed.body.firstChild as HTMLElement
}

export const findPropertyInListOfObj = (
    objects: IStyle[],
    property: string
): string => {
    if (!Array.isArray(objects))
        throw new Error(`Objects must be an Array. Received: ${objects}`)
    if (typeof property !== "string")
        throw new Error(`Property must be a string. Received: ${property}`)
    let result
    for (const obj of objects) {
        const value = obj[property]
        if (value !== undefined && result === undefined) {
            result = value
        } else if (value !== undefined && result !== undefined) {
            // Так как мы теперь смешиваем области видимости, то возможны
            // коллизии. Маловероятно, что на этом проекте, но лучше страховку
            // поставить
            throw new Error("Duplicate names found. Check your style names")
        }
    }
    if (result === undefined)
        throw new Error(
            `Can not find property ${property} in objects ${objects}. Check arguments`
        )
    return result
}

// Преобразуем список со стилями в строку для проброса в шаблон
export const convertStyles2Strings = (
    classMappings: IStyle[],
    ...classArgs: (string | string[] | undefined)[]
) => {
    const totalArg = []
    const classArgsFlatted = classArgs.flat()
    for (const classArg of classArgsFlatted) {
        if (typeof classArg === "string") {
            totalArg.push(findPropertyInListOfObj(classMappings, classArg))
        }
    }
    return classNames(totalArg)
}

// Заглушка, которая вызывается во всех сабмитах, чтобы показать
// работоспособность
export const onSubmitMock = (event: Event) => {
    event.preventDefault()
    console.log("Form submitted!")
}

export const capitalizeFirstSymbol = (text: string): string | undefined => {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export const selectPlaceholder = (element: Element, id_: string): Element => {
    const placeholder = element.querySelector(`#${id_}`)
    if (placeholder === null)
        throw new Error(`Element with ${id_} can not be found`)
    return placeholder
}

export const render = (query: string, block: Block): Element => {
    const root = document.querySelector(query)
    if (root === null) throw new Error("Check your query")
    const content = block.getContent()
    if (content !== null) {
        root.appendChild(content)
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
    index?: number
) => {
    if (value instanceof Block) {
        const id = uuidv4()

        const mockDomString = `<div data-content-id="${id}"></div>` // делаем заглушку
        components[id] = value // сохраняем компонент
        const contextValue = context[key]
        if (Array.isArray(contextValue) && index !== undefined) {
            contextValue[index] = mockDomString
        } else {
            context[key] = mockDomString
        }
    }
}

export const compile2Dom = (
    templateFunc: (context: Props) => string,
    context: Props
): HTMLElement => {
    const fragment = document.createElement("template")
    const components: Record<string, Block> = {}

    for (const [key, value] of Object.entries(context)) {
        // Определяем, какие из переменных контекста — компоненты.

        if (Array.isArray(value)) {
            for (const [index, arrayValue] of value.entries()) {
                fillComponentId(components, key, arrayValue, context, index)
            }
        } else fillComponentId(components, key, value, context)
    }

    fragment.innerHTML = templateFunc(context)

    for (const [id, component] of Object.entries(components)) {
        const stub = fragment.content.querySelector(`[data-content-id="${id}"]`)
        if (stub === null)
            throw new Error("You must find that Id. Something is missing")
        const content = component.getContent()
        if (content !== null) stub.replaceWith(content)
    }
    return fragment.content.firstChild as HTMLElement
}

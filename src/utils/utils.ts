import { v4 as uuidv4 } from "uuid"

import classNames from "classnames"
import { Block, Events, Props } from "../block"
import { errorMessages, validators } from "./validators"

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

export const onSubmitMock = (event: Event) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement

    // Не вижу смысла в этой валидации, но раз в задании есть, добавил
    let isValid = true
    for (const inputElement of form.getElementsByTagName("input")) {
        const validator = validators[inputElement.name]
        if (!validator(inputElement.value)) {
            inputElement.setCustomValidity(errorMessages[inputElement.name])
            isValid = false
        }
    }

    if (isValid) {
        const data = new FormData(form)
        for (const [key, value] of data.entries()) {
            console.log(`${key}: ${value}`)
        }
        form.reset()
    }
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

export const compile2Dom = (
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

export const pushEvent = (
    events: Events,
    eventName: string,
    eventListener: EventListener
) => {
    if (events[eventName] !== undefined) {
        events[eventName].push(eventListener)
    } else {
        events[eventName] = [eventListener]
    }
}

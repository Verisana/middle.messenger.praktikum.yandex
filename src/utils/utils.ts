import classNames from "classnames"

export const string2DomElement = (toParse: string): Element => {
    const parsed = new DOMParser().parseFromString(toParse, "text/html")
    return parsed.body.firstChild as Element
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

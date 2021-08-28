import classNames from "classnames"

export const string2DomElement = (toParse) => {
    if (typeof toParse !== "string") {
        throw new Error("Argument must be string")
    }
    const parsed = new DOMParser().parseFromString(toParse, "text/html")
    return parsed.body.firstChild
}

export const findPropertyInListOfObj = (objects, property) => {
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
export const convertStyles2Strings = (classMappings, ...classArgs) => {
    const totalArg = []
    classArgs = classArgs.flat()
    for (const classArg of classArgs) {
        if (typeof classArg === "string") {
            totalArg.push(findPropertyInListOfObj(classMappings, classArg))
        }
    }
    return classNames(totalArg)
}

// Заглушка, которая вызывается во всех сабмитах, чтобы показать
// работоспособность
export const onSubmitMock = (event) => {
    event.preventDefault()
    console.log("Form submitted!")
}

export const capitalizeFirstSymbol = (text) => {
    if (typeof text === "string") {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
}
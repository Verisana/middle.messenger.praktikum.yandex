import classNames from "classnames"
import { Events } from "../components/block"
import { PlainObject } from "./types"
import { errorMessages, validators } from "./validators"

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

export const isArray = (value: unknown): value is [] => {
    return Array.isArray(value)
}

export const isPlainObject = (value: unknown): value is PlainObject => {
    return (
        typeof value === "object" &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === "[object Object]"
    )
}

export const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
    return isPlainObject(value) || isArray(value)
}

export const isEqual = (lhs: PlainObject, rhs: PlainObject): boolean => {
    // Сравнение количества ключей объектов и массивов
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key]
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (!isEqual(value, rightValue)) {
                return false
            }
        }

        if (value !== rightValue) {
            return false
        }
    }

    return true
}

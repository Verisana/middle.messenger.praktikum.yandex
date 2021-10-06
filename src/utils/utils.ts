import classNames from "classnames"
import { Events } from "../components/block"
import { PlainObject } from "./types"
import { isFormDataValid } from "./validators"

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
    if (isFormDataValid(form)) {
        const data = new FormData(form)
        data.forEach((value, key) => {
            console.log(`${key}: ${value}`)
        })
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

export function isEmpty(obj: object): boolean {
    return (
        obj && // 👈 null and undefined check
        Object.keys(obj).length === 0 &&
        Object.getPrototypeOf(obj) === Object.prototype
    )
}

export function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key
}

export function getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = []

    for (const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)))
        } else {
            result.push([
                getKey(key, parentKey),
                encodeURIComponent(String(value))
            ])
        }
    }

    return result
}

export function queryString(data: PlainObject) {
    if (!isPlainObject(data)) {
        throw new Error("input must be an object")
    }

    return getParams(data)
        .map((arr) => arr.join("="))
        .join("&")
}

export function appendEvent(
    events: Events,
    eventName: string,
    callback: EventListener
): boolean {
    if (events.eventName === undefined) {
        events[eventName] = [callback]
    } else {
        events[eventName].push(callback)
    }
    return true
}

export function merge(lhs: PlainObject, rhs: PlainObject): PlainObject {
    // eslint-disable-next-line no-restricted-syntax
    for (const p in rhs) {
        if (Object.prototype.hasOwnProperty.call(rhs, p)) {
            try {
                if (rhs[p].constructor === Object) {
                    rhs[p] = merge(lhs[p] as PlainObject, rhs[p] as PlainObject)
                } else {
                    lhs[p] = rhs[p]
                }
            } catch (e) {
                lhs[p] = rhs[p]
            }
        }
    }

    return lhs
}

export function set(
    object: PlainObject | unknown,
    path: string,
    value: unknown
): PlainObject | unknown {
    if (typeof object !== "object" || object === null) {
        return object
    }

    if (typeof path !== "string") {
        throw new Error("path must be string")
    }

    const result = path.split(".").reduceRight<PlainObject>(
        (acc, key) => ({
            [key]: acc
        }),
        value as any
    )
    return merge(object as PlainObject, result)
}

export function isObject(val: unknown): val is object {
    return val === Object(val)
}

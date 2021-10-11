import { Block } from "../components/block"

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

export function getBaseUrl(): string {
    const { location } = window
    return `${location.protocol}//${location.host}`
}

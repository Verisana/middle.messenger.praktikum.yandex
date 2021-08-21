export const string2DomElement = (toParse) => {
    if (typeof toParse !== "string") {
        throw new Error("Argument must be string")
    }
    const parsed = new DOMParser().parseFromString(toParse, "text/html")
    return parsed.body.firstChild
}

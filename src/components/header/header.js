import headerTemplate from "./header.hbs"

const header = new DOMParser().parseFromString(headerTemplate(), "text/html")
    .body.firstChild

export { header }

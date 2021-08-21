import footerTemplate from "./footer.hbs"

const footer = new DOMParser().parseFromString(footerTemplate(), "text/html")
    .body.firstChild

export { footer }

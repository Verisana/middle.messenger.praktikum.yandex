import classes from "./layout.css"
import { header } from "../components/header/index.js"
import { footer } from "../components/footer/index.js"

const clearBodyContent = () => {
    const body = document.body
    while (body.firstChild) {
        body.removeChild(body.lastChild)
    }
}

export const renderContent = (content, isLogged = false) => {
    if (typeof content !== "function") {
        throw new Error("Check renderNewPage passed arguments")
    }

    for (const [, modifiedClassName] of Object.entries(classes)) {
        if (!document.body.classList.contains(modifiedClassName)) {
            document.body.classList.add(modifiedClassName)
        }
    }
    clearBodyContent()
    document.body.appendChild(header(isLogged))
    document.body.appendChild(content())
    document.body.appendChild(footer())
}

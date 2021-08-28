import "./layout.css"
import { header } from "../components/header/index.js"
import { footer } from "../components/footer/index.js"

export const renderContent = (content) => {
    if (typeof content !== "function") {
        throw new Error("Check renderNewPage passed arguments")
    }

    document.body.innerHTML = ""
    document.body.appendChild(header())
    document.body.appendChild(content())
    document.body.appendChild(footer())
}

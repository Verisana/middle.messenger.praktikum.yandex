import "./layout.css"
import { header } from "../components/header"
import { footer } from "../components/footer"

export const renderContent = (content: Function) => {
    if (typeof content !== "function") {
        throw new Error("Check renderContent passed arguments")
    }

    document.body.innerHTML = ""
    document.body.appendChild(header())
    document.body.appendChild(content())
    document.body.appendChild(footer())
}

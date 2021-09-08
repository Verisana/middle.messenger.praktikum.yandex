import "./layout.css"
import { header } from "../components/header"
import { Footer } from "../components/footer"
import { render } from "../utils/utils"

export const renderContent = (content: () => Element) => {
    document.body.innerHTML = ""
    const footer = new Footer()
    console.log(footer)
    document.body.appendChild(header())
    document.body.appendChild(content())
    render("body", footer)
}

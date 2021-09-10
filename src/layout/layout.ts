import "./layout.css"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { render } from "../utils/utils"

export const renderContent = (content: () => Element) => {
    document.body.innerHTML = ""

    render("body", new Header())
    document.body.appendChild(content())
    render("body", new Footer())
}

import classes from "./login.css"
import loginTemplate from "./login.hbs"
import { string2DomElement } from "../../../utils/utils.js"
import { linkButtons } from "../../../router/tempButtons"

import Handlebars from "handlebars/runtime"
import buttonTemplate from "../../../components/button/button.hbs"

console.log(buttonTemplate({ buttonName: "Test button" }))
Handlebars.registerPartial(
    "testPartial",
    buttonTemplate({buttonName: "Test button"})
)
console.log(Handlebars.partials)


const loginContent = () => {
    const params = {
        inputPlace: "login-input",
        buttonToHome: "login-no-account-button"
    }

    const content = string2DomElement(loginTemplate(params))
    const inputPlace = content.querySelector(`#${params.inputPlace}`)
    const buttonPlace = content.querySelector(`#${params.buttonToHome}`)

    // inputPlace.appendChild()
    buttonPlace.appendChild(linkButtons.register)
    return content
}

export { loginContent }

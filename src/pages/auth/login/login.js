import classes from "./login.css"
import loginTemplate from "./login.hbs"
import { string2DomElement } from "../../../utils/utils.js"
import { linkButtons } from "../../../router/tempButtons"
import { submitForm } from "../../../components/submitForm/index"
import { inputField } from "../../../components/inputField/index"
import { button } from "../../../components/button/index"

const buildLoginForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            label_: { text: "testName" },
            input_: { type: "text" },
            br_: true
        }),
        inputField.bind(null, {
            label_: { text: "testName2" },
            input_: { type: "text" },
            br_: true
        })
    ]
    const submitBuilder = button.bind(null, { text: "Submit", type_: "submit" })
    return submitForm({ inputBuilders, submitBuilder })
}

const loginContent = () => {
    const params = {
        inputPlace: "login-input",
        buttonToHome: "login-no-account-button"
    }

    const content = string2DomElement(loginTemplate(params))
    const inputPlace = content.querySelector(`#${params.inputPlace}`)
    const buttonPlace = content.querySelector(`#${params.buttonToHome}`)

    inputPlace.appendChild(buildLoginForm())
    buttonPlace.appendChild(linkButtons.register())
    return content
}

export { loginContent }

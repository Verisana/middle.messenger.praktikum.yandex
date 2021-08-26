import styles from "./login.css"
import loginTemplate from "./login.hbs"
import { string2DomElement, onSubmitMock } from "../../../utils/utils.js"
import { linkButtons } from "../../../router/tempButtons"
import { submitForm } from "../../../components/submitForm/index"
import { inputField } from "../../../components/inputField/index"
import { button } from "../../../components/button/index"

const buildLoginForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            input_: { type: "text", name: "login", required: true },
            label_: {
                text: "Логин"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "password",
                name: "password",
                required: true
            },
            label_: {
                text: "Пароль"
            },
            br_: true
        })
    ]
    const submitBuilder = button.bind(null, { text: "Войти", type_: "submit" })
    return submitForm({
        inputBuilders,
        submitBuilder,
        formHeaderText: "Введите для авторизации",
        onSubmitFunc: onSubmitMock
    })
}

export const loginContent = () => {
    const placeholders = {
        formPlace: "login-input",
        buttonToRegister: "login-no-account-button"
    }
    const params = {
        ...placeholders
    }

    const content = string2DomElement(loginTemplate(params))
    const formPlace = content.querySelector(`#${placeholders.formPlace}`)
    const buttonPlace = content.querySelector(
        `#${placeholders.buttonToRegister}`
    )

    formPlace.appendChild(buildLoginForm())
    buttonPlace.appendChild(linkButtons.register({ text: "Нет аккаунта?" }))
    return content
}

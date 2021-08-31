import "./login.css"
import loginTemplate from "./login.hbs"
import { string2DomElement, onSubmitMock, selectPlaceholder } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { submitForm } from "../../../components/submitForm"
import { inputField } from "../../../components/inputField"
import { button } from "../../../components/button"

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

    const formPlace = selectPlaceholder(content, placeholders.formPlace)
    const buttonPlace = selectPlaceholder(content, placeholders.buttonToRegister)

    formPlace.appendChild(buildLoginForm())
    buttonPlace.appendChild(linkButtons.register({ text: "Нет аккаунта?" }))
    return content
}

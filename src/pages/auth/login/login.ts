import "./login.css"
import loginTemplate from "./login.hbs"
import {
    string2DomElement,
    onSubmitMock,
    selectPlaceholder
} from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { submitForm } from "../../../components/submitForm"
import { inputField } from "../../../components/inputField"
import { registerContent } from "../register"
import { Button } from "../../../components/button"

const buildLoginForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            inputPart: { type: "text", name: "login", required: true },
            label: {
                text: "Логин"
            },
            br: true
        }),
        inputField.bind(null, {
            inputPart: {
                type: "password",
                name: "password",
                required: true
            },
            label: {
                text: "Пароль"
            },
            br: true
        })
    ]
    const submitBuilder = () => {
        return new Button({
            props: {
                text: "Войти",
                type_: "submit"
            }
        }).element
    }
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
    const buttonPlace = selectPlaceholder(
        content,
        placeholders.buttonToRegister
    )

    formPlace.appendChild(buildLoginForm())
    buttonPlace.appendChild(
        linkButtons.register({ text: "Нет аккаунта?" }, registerContent).element
    )
    return content
}

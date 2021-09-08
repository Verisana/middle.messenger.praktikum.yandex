import "./register.css"
import registerTemplate from "./register.hbs"
import {
    string2DomElement,
    onSubmitMock,
    selectPlaceholder
} from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { submitForm } from "../../../components/submitForm"
import { inputField } from "../../../components/inputField"
import { loginContent } from "../login"
import { Button } from "../../../components/button"

const buildRegisterForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            inputPart: {
                type: "tel",
                name: "phone",
                required: true
            },
            label: {
                text: "Телефон"
            },
            br: true
        }),
        inputField.bind(null, {
            inputPart: {
                type: "text",
                name: "login",
                required: true
            },
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
        }),
        inputField.bind(null, {
            inputPart: { type: "text", name: "first_name" },
            label: {
                text: "Имя"
            },
            br: true
        }),
        inputField.bind(null, {
            inputPart: {
                type: "text",
                name: "second_name"
            },
            label: {
                text: "Фамилия"
            },
            br: true
        }),
        inputField.bind(null, {
            inputPart: { type: "email", name: "email" },
            label: {
                text: "Email"
            },
            br: true
        })
    ]
    const submitBuilder = () => {
        const content = new Button({
            props: {
                text: "Зарегистрироваться",
                type_: "submit"
            }
        }).getContent()
        if (content === null) throw new Error("Content can not be empty")
        return content
    }
    return submitForm({
        inputBuilders,
        submitBuilder,
        formHeaderText: "Введите для регистрации",
        onSubmitFunc: onSubmitMock
    })
}

export const placeholders = {
    formPlace: "register-form-place",
    buttonToLogin: "register-to-login-place"
}

export const registerContent = () => {
    const params = {
        ...placeholders
    }

    const content = string2DomElement(registerTemplate(params))
    const formPlace = selectPlaceholder(content, placeholders.formPlace)
    const buttonPlace = selectPlaceholder(content, placeholders.buttonToLogin)

    formPlace.appendChild(buildRegisterForm())
    buttonPlace.appendChild(
        linkButtons.login({ text: "Уже есть аккаунт?" }, loginContent).element
    )

    return content
}

import styles from "./register.css"
import registerTemplate from "./register.hbs"
import { string2DomElement, onSubmitMock, selectPlaceholder } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { submitForm } from "../../../components/submitForm"
import { inputField } from "../../../components/inputField"
import { button } from "../../../components/button"

const buildRegisterForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            input_: {
                type: "tel",
                name: "phone",
                required: true
            },
            label_: {
                text: "Телефон"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "text",
                name: "login",
                required: true
            },
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
        }),
        inputField.bind(null, {
            input_: { type: "text", name: "first_name" },
            label_: {
                text: "Имя"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "text",
                name: "second_name"
            },
            label_: {
                text: "Фамилия"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: { type: "email", name: "email" },
            label_: {
                text: "Email"
            },
            br_: true
        })
    ]
    const submitBuilder = button.bind(null, {
        text: "Зарегистрироваться",
        type_: "submit"
    })
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
    buttonPlace.appendChild(linkButtons.login({ text: "Уже есть аккаунт?" }))

    return content
}

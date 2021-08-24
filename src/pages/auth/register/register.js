import styles from "./register.css"
import registerTemplate from "./register.hbs"
import { string2DomElement, onSubmitMock } from "../../../utils/utils.js"
import { linkButtons } from "../../../router/tempButtons"
import { submitForm } from "../../../components/submitForm/index"
import { inputField } from "../../../components/inputField/index"
import { button } from "../../../components/button/index"

const buildRegisterForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            input_: {
                type: "tel",
                placeholder: "Телефон",
                name: "phone",
                required: true
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "text",
                placeholder: "Логин",
                name: "login",
                required: true
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "password",
                placeholder: "Пароль",
                name: "password",
                required: true
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: { type: "text", placeholder: "Имя", name: "first_name" },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "text",
                placeholder: "Фамилия",
                name: "second_name"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: { type: "email", placeholder: "Email", name: "email" },
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
    const formPlace = content.querySelector(`#${placeholders.formPlace}`)
    const buttonPlace = content.querySelector(`#${placeholders.buttonToLogin}`)

    formPlace.appendChild(buildRegisterForm())
    buttonPlace.appendChild(linkButtons.login({ text: "Уже есть аккаунт?" }))

    return content
}

import styles from "./settings.css"
import settingsTemplate from "./settings.hbs"
import { string2DomElement, onSubmitMock } from "../../utils/utils.js"
import { linkButtons } from "../../router/tempButtons"
import { submitForm } from "../../components/submitForm/index"
import { inputField } from "../../components/inputField/index"
import { button } from "../../components/button/index"

// Сюда в value нужно будет потом прокинуть уже установленные значения, чтобы
// автоматом подставлялись
const buildSettingsForm = () => {
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
        text: "Сохранить",
        type_: "submit"
    })
    return submitForm({
        inputBuilders,
        submitBuilder,
        onSubmitFunc: onSubmitMock
    })
}

export const placeholders = {
    formPlace: "settings-form-place",
    buttonToHome: "settings-to-login-place"
}

export const settingsContent = () => {
    const params = {
        // Пока не знаю, откуда будут картинки приходить, поставлю просто ссылку на статическую картинку
        linkToImage:
            "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png",
        ...placeholders
    }

    const content = string2DomElement(settingsTemplate(params))
    const formPlace = content.querySelector(`#${placeholders.formPlace}`)
    const buttonPlace = content.querySelector(`#${placeholders.buttonToHome}`)

    formPlace.appendChild(buildSettingsForm())
    buttonPlace.appendChild(linkButtons.home({ text: "Вернуться к чатам" }))

    return content
}

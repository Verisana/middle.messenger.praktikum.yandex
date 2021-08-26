import "./settings.css"
import layoutStyles from "../../layout/layout.css"
import settingsTemplate from "./settings.hbs"
import {
    string2DomElement,
    onSubmitMock,
    convertStyles2Strings
} from "../../utils/utils.js"
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
                type: "password",
                name: "oldPassword",
                required: true
            },
            label_: {
                text: "Текущий пароль"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "password",
                name: "newPassword"
            },
            label_: {
                text: "Новый пароль"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "tel",
                name: "phone"
            },
            label_: {
                text: "Телефон"
            },
            br_: true
        }),
        inputField.bind(null, {
            input_: {
                type: "text",
                name: "login"
            },
            label_: {
                text: "Логин"
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
        text: "Сохранить",
        type_: "submit"
    })
    return submitForm({
        inputBuilders,
        submitBuilder,
        formHeaderText: "Данные для редактирования",
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
        avatarStyle: convertStyles2Strings(layoutStyles, [
            "img__avatar_default"
        ]),
        ...placeholders
    }

    const content = string2DomElement(settingsTemplate(params))
    const formPlace = content.querySelector(`#${placeholders.formPlace}`)
    const buttonPlace = content.querySelector(`#${placeholders.buttonToHome}`)

    formPlace.appendChild(buildSettingsForm())
    buttonPlace.appendChild(linkButtons.home({ text: "Вернуться к чатам" }))

    return content
}

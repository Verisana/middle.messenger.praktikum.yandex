import "./settings.css"
import layoutStyles from "../../layout/layout.css"
import settingsTemplate from "./settings.hbs"
import {
    string2DomElement,
    onSubmitMock,
    convertStyles2Strings,
    selectPlaceholder
} from "../../utils/utils"
import { linkButtons } from "../../router/tempButtons"
import { submitForm } from "../../components/submitForm"
import { inputField } from "../../components/inputField"
import { homeContent } from "../home"
import { Button } from "../../components/button"

// Сюда в value нужно будет потом прокинуть уже установленные значения, чтобы
// автоматом подставлялись
const buildSettingsForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            inputPart: {
                type: "password",
                name: "oldPassword",
                required: true
            },
            label: {
                text: "Текущий пароль"
            },
            br: true
        }),
        inputField.bind(null, {
            inputPart: {
                type: "password",
                name: "newPassword"
            },
            label: {
                text: "Новый пароль"
            },
            br: true
        }),
        inputField.bind(null, {
            inputPart: {
                type: "tel",
                name: "phone"
            },
            label: {
                text: "Телефон"
            },
            br: true
        }),
        inputField.bind(null, {
            inputPart: {
                type: "text",
                name: "login"
            },
            label: {
                text: "Логин"
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
                text: "Сохранить",
                type_: "submit"
            }
        }).getContent()
        if (content === null) throw new Error("Content can not be empty")
        return content
    }
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
        avatarStyle: convertStyles2Strings(
            [layoutStyles],
            "img__avatar_default"
        ),
        ...placeholders
    }

    const content = string2DomElement(settingsTemplate(params))
    const formPlace = selectPlaceholder(content, placeholders.formPlace)
    const buttonPlace = selectPlaceholder(content, placeholders.buttonToHome)

    formPlace.appendChild(buildSettingsForm())
    buttonPlace.appendChild(
        linkButtons.home({ text: "Вернуться к чатам" }, homeContent).element
    )

    return content
}

import "./settings.css"
import layoutStyles from "../../layout/layout.css"
import settingsTemplate from "./settings.hbs"
import {
    onSubmitMock,
    convertStyles2Strings,
    compile2Dom
} from "../../utils/utils"
import { linkButtons } from "../../router/tempButtons"
import { SubmitForm } from "../../components/submitForm"
import { InputField } from "../../components/inputField"
import { HomePage } from "../home"
import { Button } from "../../components/button"
import { Block } from "../../block"

// Сюда в value нужно будет потом прокинуть уже установленные значения, чтобы
// автоматом подставлялись
const formInputs = [
    new InputField({
        props: {
            inputPart: {
                type: "password",
                name: "oldPassword",
                required: true
            },
            label: {
                text: "Текущий пароль"
            },
            br: true
        }
    }),
    new InputField({
        props: {
            inputPart: {
                type: "password",
                name: "newPassword"
            },
            label: {
                text: "Новый пароль"
            },
            br: true
        }
    }),
    new InputField({
        props: {
            inputPart: {
                type: "tel",
                name: "phone"
            },
            label: {
                text: "Телефон"
            },
            br: true
        }
    }),
    new InputField({
        props: {
            inputPart: {
                type: "text",
                name: "login"
            },
            label: {
                text: "Логин"
            },
            br: true
        }
    }),
    new InputField({
        props: {
            inputPart: {
                type: "text",
                name: "first_name"
            },
            label: {
                text: "Имя"
            },
            br: true
        }
    }),
    new InputField({
        props: {
            inputPart: {
                type: "text",
                name: "second_name"
            },
            label: {
                text: "Фамилия"
            },
            br: true
        }
    }),
    new InputField({
        props: {
            inputPart: { type: "email", name: "email" },
            label: {
                text: "Email"
            },
            br: true
        }
    })
]

export class SettingsPage extends Block {
    constructor() {
        super({
            props: {
                // Пока не знаю, откуда будут картинки приходить, поставлю просто ссылку на статическую картинку
                linkToImage:
                    "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png",
                avatarStyle: convertStyles2Strings(
                    [layoutStyles],
                    "img__avatar_default"
                ),
                SettingsForm: new SubmitForm({
                    props: {
                        formHeaderText: "Данные для редактирования",
                        Inputs: formInputs,
                        SubmitButton: new Button({
                            events: {
                                click: onSubmitMock
                            },
                            props: {
                                text: "Сохранить",
                                type_: "submit"
                            }
                        })
                    }
                }),
                HomeButton: linkButtons.home(
                    { text: "Вернуться к чатам" },
                    () => new HomePage()
                )
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(settingsTemplate, this.props)
    }
}

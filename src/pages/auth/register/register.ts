import "./register.css"
import registerTemplate from "./register.hbs"
import { onSubmitMock, compile2Dom } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { SubmitForm } from "../../../components/submitForm"
import { InputField } from "../../../components/inputField"
import { LoginPage } from "../login"
import { Button } from "../../../components/button"
import { Block } from "../../../block"

const registerInputs = [
    new InputField({
        props: {
            inputPart: {
                type: "tel",
                name: "phone",
                required: true
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
                name: "login",
                required: true
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
                type: "password",
                name: "password",
                required: true
            },
            label: {
                text: "Пароль"
            },
            br: true
        }
    }),

    new InputField({
        props: {
            inputPart: { type: "text", name: "first_name" },
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

export class RegisterPage extends Block {
    constructor() {
        super({
            props: {
                RegisterSubmitForm: new SubmitForm({
                    props: {
                        formHeaderText: "Введите для регистрации",
                        Inputs: registerInputs,
                        SubmitButton: new Button({
                            events: {
                                click: onSubmitMock
                            },
                            props: {
                                text: "Зарегистрироваться",
                                type_: "submit"
                            }
                        })
                    }
                }),
                LoginButton: linkButtons.login(
                    { text: "Уже есть аккаунт?" },
                    () => new LoginPage()
                )
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(registerTemplate, this.props)
    }
}

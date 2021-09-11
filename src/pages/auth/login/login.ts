import "./login.css"
import loginTemplate from "./login.hbs"
import { onSubmitMock, compile2Dom } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { SubmitForm } from "../../../components/submitForm"
import { InputField } from "../../../components/inputField"
import { RegisterPage } from "../register"
import { Button } from "../../../components/button"
import { Block } from "../../../block"

const loginInputs = [
    new InputField({
        props: {
            inputPart: { type: "text", name: "login", required: true },
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
    })
]

export class LoginPage extends Block {
    constructor() {
        super({
            props: {
                LoginSubmitForm: new SubmitForm({
                    events: {
                        submit: onSubmitMock
                    },
                    props: {
                        formHeaderText: "Введите для авторизации",
                        Inputs: loginInputs,
                        SubmitButton: new Button({
                            props: {
                                text: "Войти",
                                type_: "submit"
                            }
                        })
                    }
                }),
                RegisterButton: linkButtons.register(
                    { text: "Нет аккаунта?" },
                    () => new RegisterPage()
                )
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(loginTemplate, this.props)
    }
}

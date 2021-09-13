import "./register.css"
import registerTemplate from "./register.hbs"
import { onSubmitMock, compile2Dom } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { SubmitForm } from "../../../components/submitForm"
import { LoginPage } from "../login"
import { Button } from "../../../components/button"
import { Block } from "../../../block"
import { getRegisterInputs } from "../../../components/inputs"

export class RegisterPage extends Block {
    constructor() {
        super({
            props: {
                RegisterSubmitForm: new SubmitForm({
                    events: {
                        submit: onSubmitMock
                    },
                    props: {
                        formHeaderText: "Введите для регистрации",
                        Inputs: getRegisterInputs(),
                        SubmitButton: new Button({
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

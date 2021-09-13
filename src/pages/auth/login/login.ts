import "./login.css"
import loginTemplate from "./login.hbs"
import { onSubmitMock, compile2Dom } from "../../../utils/utils"
import { linkButtons } from "../../../router/tempButtons"
import { SubmitForm } from "../../../components/submitForm"
import { RegisterPage } from "../register"
import { Button } from "../../../components/button"
import { Block } from "../../../block"
import { getLoginInputs } from "../../../components/inputs"

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
                        Inputs: getLoginInputs(),
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

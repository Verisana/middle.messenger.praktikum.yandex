import "./register.css"
import registerTemplate from "./register.hbs"
import { onSubmitMock } from "../../../utils/utils"
import { compile2Dom } from "../../../utils/dom_utils"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
import { getRegisterInputs } from "../../../modules/inputs"
import { routerFactory } from "../../../router"
import { urlSlugs } from "../../../routes"

const router = routerFactory()

export class RegisterPage extends Block {
    constructor() {
        super({
            props: {
                RegisterSubmitForm: new SubmitForm({
                    props: {
                        formHeaderText: "Введите для регистрации",
                        Inputs: getRegisterInputs(),
                        SubmitButton: new Button({
                            events: {
                                submit: [onSubmitMock]
                            },
                            props: {
                                text: "Зарегистрироваться",
                                type_: "submit"
                            }
                        })
                    }
                }),
                LoginButton: new Button({
                    props: {
                        events: {
                            click: [router.go.bind(router, urlSlugs.login)]
                        },
                        text: "Уже есть аккаунт?"
                    }
                })
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(registerTemplate, this.props)
    }
}

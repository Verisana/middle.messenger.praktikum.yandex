import "./login.css"
import loginTemplate from "./login.hbs"
import { onSubmitMock } from "../../../utils/utils"
import { compileToDom } from "../../../utils/dom_utils"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
import { getLoginInputs } from "../../../modules/inputs"
import { urlSlugs } from "../../../routes"
import { routerFactory } from "../../../router"

const router = routerFactory()

export class LoginPage extends Block {
    constructor() {
        super({
            props: {
                LoginSubmitForm: new SubmitForm({
                    props: {
                        events: {
                            submit: [onSubmitMock]
                        },
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
                RegisterButton: new Button({
                    props: {
                        events: {
                            click: [router.go.bind(router, urlSlugs.register)]
                        },
                        text: "Нет аккаунта?"
                    }
                })
            }
        })
    }

    render(): HTMLElement {
        return compileToDom(loginTemplate, this.props)
    }
}

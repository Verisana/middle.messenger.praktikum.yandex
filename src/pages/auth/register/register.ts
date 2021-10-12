import "./register.css"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block, Props } from "../../../components/block"
import { getRegisterInputs } from "../../../modules/inputs"
import { routerFactory } from "../../../router"
import { urlSlugs } from "../../../consts"
import { authController, submitControllerBuilder } from "../../../controllers"

const router = routerFactory()

export class RegisterPage extends Block {
    constructor() {
        super({
            props: {
                RegisterSubmitForm: new SubmitForm({
                    props: {
                        events: {
                            submit: [
                                submitControllerBuilder(
                                    authController.register.bind(authController)
                                )
                            ]
                        },
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

    render(): [string, Props] {
        return [
            /*html*/ `
            <main>
                {{{RegisterSubmitForm}}}
                {{{LoginButton}}}
            </main>
        `,
            this.props
        ]
    }
}

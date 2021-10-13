import "./register.css"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
import { getRegisterInputs } from "../../../modules/inputs"
import { routerFactory } from "../../../router"
import { urlSlugs } from "../../../consts"
import { authController, submitControllerBuilder } from "../../../controllers"
import { IRegisterPageProps } from "./types"

const router = routerFactory()

export class RegisterPage extends Block<IRegisterPageProps> {
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
                            click: [() => router.go(urlSlugs.login)]
                        },
                        text: "Уже есть аккаунт?"
                    }
                })
            }
        })
    }

    render(): [string, IRegisterPageProps] {
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

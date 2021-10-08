import "./register.css"
import registerTemplate from "./register.hbs"
import { compileToDom } from "../../../utils/dom_utils"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
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

    componentBeforeMount() {}

    render(): HTMLElement {
        return compileToDom(registerTemplate, this.props)
    }
}

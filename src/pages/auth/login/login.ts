import "./login.css"
import loginTemplate from "./login.hbs"
import { compileToDom } from "../../../utils/dom_utils"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
import { getLoginInputs } from "../../../modules/inputs"
import { urlSlugs } from "../../../consts"
import { routerFactory } from "../../../router"
import authController from "../../../controllers/auth_controller"
import { ILoginPageProps } from "."
import { submitControllerBuilder } from "../../../controllers/utils"

const router = routerFactory()

export class LoginPage extends Block {
    constructor() {
        const props: ILoginPageProps = {
            LoginSubmitForm: new SubmitForm({
                props: {
                    events: {
                        submit: [
                            submitControllerBuilder(
                                authController.login.bind(authController)
                            )
                        ]
                    },
                    formHeaderText: "Введите для авторизации",
                    Inputs: getLoginInputs(),
                    SubmitButton: new Button({
                        props: {
                            text: "Войти",
                            type_: "submit"
                        }
                    }),
                    errorText:
                        "Неправильно введены логин или пароль. Попробуйте еще раз"
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

        const params = {
            props
        }
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(loginTemplate, this.props)
    }
}

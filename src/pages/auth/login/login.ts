import "./login.css"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
import { getLoginInputs } from "../../../modules/inputs"
import { urlSlugs } from "../../../consts"
import { routerFactory } from "../../../router"
import { authController, submitControllerBuilder } from "../../../controllers"
import { ILoginPageProps } from "./types"
import { appendEvent } from "../../../utils/utils"

const router = routerFactory()

export class LoginPage extends Block<ILoginPageProps> {
    constructor() {
        const props: ILoginPageProps = {
            LoginSubmitForm: new SubmitForm({
                props: {
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
                        click: [() => router.go(urlSlugs.register)]
                    },
                    text: "Нет аккаунта?"
                }
            })
        }

        super({ props })
        props.LoginSubmitForm.props.events = appendEvent(
            "submit",
            this.submitLogin.bind(this),
            props.LoginSubmitForm.props.events
        )
    }

    submitLogin(event: Event) {
        const submitFunc = submitControllerBuilder(
            authController.login.bind(authController)
        )
        try {
            submitFunc(event)
        } catch (e) {
            this.props.LoginSubmitForm.showError()
        }
    }

    render(): [string, ILoginPageProps] {
        return [
            /*html*/ `
            <main>
                {{{LoginSubmitForm}}}
                {{{RegisterButton}}}
            </main>
        `,
            this.props
        ]
    }
}

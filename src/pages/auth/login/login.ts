import "./login.css"
import loginTemplate from "./login.hbs"
import { compileToDom } from "../../../utils/dom_utils"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
import { getLoginInputs } from "../../../modules/inputs"
import { urlSlugs } from "../../../consts"
import { routerFactory } from "../../../router"
import { isFormDataValid } from "../../../utils/validators"
import authController from "../../../controllers/auth_controller"
import { ILoginPageProps } from "."

const router = routerFactory()

export class LoginPage extends Block {
    protected static async onLoginClick(event: Event) {
        console.log("Submitted!")
        event.preventDefault()
        const form = event.target as HTMLFormElement
        // Не вижу смысла в этой валидации, но раз в задании есть, добавил
        if (isFormDataValid(form)) {
            const data = new FormData(form)
            await authController.login(data)
            form.reset()
        }
    }

    constructor() {
        const props: ILoginPageProps = {
            LoginSubmitForm: new SubmitForm({
                props: {
                    events: {
                        submit: [LoginPage.onLoginClick]
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

        const params = {
            props
        }
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(loginTemplate, this.props)
    }
}

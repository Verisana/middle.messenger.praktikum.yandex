import "./register.css"
import registerTemplate from "./register.hbs"
import { compileToDom } from "../../../utils/dom_utils"
import { SubmitForm } from "../../../components/submitForm"
import { Button } from "../../../components/button"
import { Block } from "../../../components/block"
import { getRegisterInputs } from "../../../modules/inputs"
import { routerFactory } from "../../../router"
import { urlSlugs } from "../../../consts"
import { isFormDataValid } from "../../../utils/validators"
import authController from "../../../controllers/auth_controller"

const router = routerFactory()

export class RegisterPage extends Block {
    protected static async onRegisterClick(event: Event) {
        console.log("Submitted!")
        event.preventDefault()
        const form = event.target as HTMLFormElement
        // Не вижу смысла в этой валидации, но раз в задании есть, добавил
        if (isFormDataValid(form)) {
            const data = new FormData(form)
            await authController.register(data)
            form.reset()
        }
    }

    constructor() {
        super({
            props: {
                RegisterSubmitForm: new SubmitForm({
                    props: {
                        events: {
                            submit: [RegisterPage.onRegisterClick]
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

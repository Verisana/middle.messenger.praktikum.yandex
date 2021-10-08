import "./settings.css"
import layoutStyles from "../../layout/layout.css"
import settingsTemplate from "./settings.hbs"
import { convertStylesToStrings } from "../../utils/utils"
import { compileToDom } from "../../utils/dom_utils"
import { SubmitForm } from "../../components/submitForm"
import { Button } from "../../components/button"
import { Block } from "../../components/block"
import {
    getAvatarInput,
    getPasswordInputs,
    getSettingsInputs
} from "../../modules/inputs"
import { routerFactory } from "../../router"
import { urlSlugs } from "../../consts"
import { authSubmitBuilder } from "../auth/utils"
import { usersController } from "../../controllers"

const router = routerFactory()

export class SettingsPage extends Block {
    constructor() {
        super({
            storeMappings: {
                "user.avatar": ["avatarLink"]
            },
            props: {
                avatarStyle: convertStylesToStrings([layoutStyles], "avatar"),
                SettingsForm: new SubmitForm({
                    props: {
                        events: {
                            submit: [
                                authSubmitBuilder(
                                    usersController.updateProfile.bind(
                                        usersController
                                    )
                                )
                            ]
                        },
                        formHeaderText: "Отредактировать данные профиля",
                        Inputs: getSettingsInputs(),
                        SubmitButton: new Button({
                            props: {
                                text: "Сохранить",
                                type_: "submit"
                            }
                        })
                    }
                }),
                AvatarForm: new SubmitForm({
                    settings: {
                        isNoBorder: true
                    },
                    props: {
                        events: {
                            submit: [
                                authSubmitBuilder(
                                    usersController.updateAvatar.bind(
                                        usersController
                                    )
                                )
                            ]
                        },
                        formHeaderText: "Для замены загрузите новый аватар",
                        Inputs: getAvatarInput(),
                        SubmitButton: new Button({
                            props: {
                                text: "Загрузить",
                                type_: "submit"
                            }
                        })
                    }
                }),
                PasswordForm: new SubmitForm({
                    props: {
                        events: {
                            submit: [
                                authSubmitBuilder(
                                    usersController.updatePassword.bind(
                                        usersController
                                    )
                                )
                            ]
                        },
                        formHeaderText: "Изменить пароль",
                        Inputs: getPasswordInputs(),
                        SubmitButton: new Button({
                            props: {
                                text: "Сохранить",
                                type_: "submit"
                            }
                        })
                    }
                }),
                HomeButton: new Button({
                    props: {
                        events: {
                            click: [router.go.bind(router, urlSlugs.home)]
                        },
                        text: "Вернуться к чатам"
                    }
                })
            }
        })
    }

    render(): HTMLElement {
        return compileToDom(settingsTemplate, this.props)
    }
}

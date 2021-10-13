import "./settings.css"
import layoutStyles from "../../layout/layout.css"
import { convertStylesToStrings } from "../../utils/utils"
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
import { usersController, submitControllerBuilder } from "../../controllers"
import { ISettingsPageProps } from "./types"

const router = routerFactory()

export class SettingsPage extends Block<ISettingsPageProps> {
    constructor() {
        super({
            storeMappings: {
                "user.avatar": ["avatarLink"]
            },
            props: {
                avatarStyle: convertStylesToStrings([layoutStyles], "avatar"),
                avatarLink: "",
                SettingsForm: new SubmitForm({
                    props: {
                        events: {
                            submit: [
                                submitControllerBuilder(
                                    usersController.updateProfile.bind(
                                        usersController
                                    ),
                                    false
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
                                submitControllerBuilder(
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
                                submitControllerBuilder(
                                    usersController.updatePassword.bind(
                                        usersController
                                    )
                                )
                            ]
                        },
                        errorText: "Ошибка. Пароль не был изменен",
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
                            click: [() => router.go(urlSlugs.home)]
                        },
                        text: "Вернуться к чатам"
                    }
                })
            }
        })
    }

    render(): [string, ISettingsPageProps] {
        return [
            /*html*/ `
            <main>
                <img class="{{avatarStyle}}" src={{avatarLink}} alt="Avatar place" />
                {{{AvatarForm}}}
                {{{PasswordForm}}}
                {{{SettingsForm}}}
                {{{HomeButton}}}
            </main>
        `,
            this.props
        ]
    }
}

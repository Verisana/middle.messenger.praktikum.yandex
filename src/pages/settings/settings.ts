import "./settings.css"
import layoutStyles from "../../layout/layout.css"
import settingsTemplate from "./settings.hbs"
import { onSubmitMock, convertStyles2Strings } from "../../utils/utils"
import { compile2Dom } from "../../utils/dom_utils"
import { SubmitForm } from "../../components/submitForm"
import { Button } from "../../components/button"
import { Block } from "../../components/block"
import { getSettingsInputs } from "../../modules/inputs"
import { routerFactory } from "../../router"
import { urlSlugs } from "../../routes"

const router = routerFactory()

export class SettingsPage extends Block {
    constructor() {
        super({
            props: {
                // Пока не знаю, откуда будут картинки приходить, поставлю просто ссылку на статическую картинку
                linkToImage:
                    "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png",
                avatarStyle: convertStyles2Strings([layoutStyles], "avatar"),
                SettingsForm: new SubmitForm({
                    props: {
                        formHeaderText: "Данные для редактирования",
                        Inputs: getSettingsInputs(),
                        SubmitButton: new Button({
                            props: {
                                events: {
                                    submit: [onSubmitMock]
                                },
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
        return compile2Dom(settingsTemplate, this.props)
    }
}

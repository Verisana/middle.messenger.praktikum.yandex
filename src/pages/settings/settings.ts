import "./settings.css"
import layoutStyles from "../../layout/layout.css"
import settingsTemplate from "./settings.hbs"
import {
    onSubmitMock,
    convertStyles2Strings,
    compile2Dom
} from "../../utils/utils"
import { linkButtons } from "../../router/tempButtons"
import { SubmitForm } from "../../components/submitForm"
import { HomePage } from "../home"
import { Button } from "../../components/button"
import { Block } from "../../components/block"
import { getSettingsInputs } from "../../modules/inputs"

// Сюда в value нужно будет потом прокинуть уже установленные значения, чтобы
// автоматом подставлялись

export class SettingsPage extends Block {
    constructor() {
        super({
            props: {
                // Пока не знаю, откуда будут картинки приходить, поставлю просто ссылку на статическую картинку
                linkToImage:
                    "https://lumpics.ru/wp-content/uploads/2017/11/Programmyi-dlya-sozdaniya-avatarok.png",
                avatarStyle: convertStyles2Strings(
                    [layoutStyles],
                    "img__avatar_default"
                ),
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
                HomeButton: linkButtons.home(
                    { text: "Вернуться к чатам" },
                    () => new HomePage()
                )
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(settingsTemplate, this.props)
    }
}

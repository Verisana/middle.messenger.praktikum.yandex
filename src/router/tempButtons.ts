import { Button, IButtonParams, IButtonProps } from "../components/button"
import { switchContent } from "./router"
import { capitalizeFirstSymbol } from "../utils/utils"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

// Чтобы избежать циклический импорт, пришлось повозиться и некоторые вещи
// сделать криво, но сейчас линтер не ругается. Когда будет нормальный роутинг
// уберу это безобразие

type ButtonBuilder = (
    { text, imgSrc, class_, imgStyle }: IButtonProps,
    content: () => Element
) => Button

const createButtonBuilder = (
    contentRoute: string,
    styles?: string | string[]
): ButtonBuilder => {
    return (
        { text, imgSrc, class_, imgStyle }: IButtonProps,
        content: () => Element
    ): Button => {
        const params: IButtonParams = {
            events: {
                click: switchContent.bind(null, content)
            },
            props: {
                text:
                    text === undefined
                        ? capitalizeFirstSymbol(contentRoute)
                        : text,
                class_: class_ === undefined ? styles : class_,
                imgSrc,
                imgStyle
            }
        }
        return new Button(params)
    }
}

const linkButtons = {
    home: createButtonBuilder("home"),
    login: createButtonBuilder("login"),
    register: createButtonBuilder("register"),
    error: createButtonBuilder("error"),
    serverError: createButtonBuilder("serverError"),
    profileSettings: createButtonBuilder("profileSettings")
}

export { linkButtons }

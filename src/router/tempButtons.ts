import { button, IButton } from "../components/button"
import { switchContent } from "./router"
import { capitalizeFirstSymbol } from "../utils/utils"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

// Чтобы избежать циклический импорт, пришлось повозиться и некоторые вещи
// сделать криво, но сейчас линтер не ругается. Когда будет нормальный роутинг
// уберу это безобразие

type ButtonBuilder = (
    { text, imgSrc, class_, imgStyle }: IButton,
    content: () => Element
) => Element

const createButtonBuilder = (
    contentRoute: string,
    styles?: string | string[]
): ButtonBuilder => {
    return (
        { text, imgSrc, class_, imgStyle }: IButton,
        content: () => Element
    ): Element => {
        const buttonElement = button({
            text:
                text === undefined ? capitalizeFirstSymbol(contentRoute) : text,
            class_: class_ === undefined ? styles : class_,
            imgSrc,
            imgStyle
        })
        buttonElement.addEventListener("click", () => {
            switchContent(content)
        })
        return buttonElement
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

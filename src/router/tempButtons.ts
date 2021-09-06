import { button, IButton } from "../components/button"
import { switchContent } from "./router"
import { capitalizeFirstSymbol } from "../utils/utils"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

type ButtonBuilder = ({ text, imgSrc, class_, imgStyle }: IButton) => Element

const createButtonBuilder = (
    contentRoute: string,
    styles?: string | string[]
): ButtonBuilder => {
    return ({ text, imgSrc, class_, imgStyle }: IButton): Element => {
        const buttonElement = button({
            text:
                text === undefined ? capitalizeFirstSymbol(contentRoute) : text,
            class_: class_ === undefined ? styles : class_,
            imgSrc,
            imgStyle
        })
        buttonElement.addEventListener("click", () => {
            switchContent(contentRoute)
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

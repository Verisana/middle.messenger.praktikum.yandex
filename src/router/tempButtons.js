import { button } from "../components/button/index.js"
import { switchContent } from "./router.js"
import { capitalizeFirstSymbol } from "../utils/utils.js"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

const createButtonBuilder = (contentRoute, styles) => {
    return ({ text, imgSrc, class_, imgStyle } = {}) => {
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

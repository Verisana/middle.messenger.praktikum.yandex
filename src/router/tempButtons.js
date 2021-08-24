import { button } from "../components/button/index.js"
import { switchContent } from "./router.js"
import { capitalizeFirstSymbol } from "../utils/utils.js"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

const createButtonBuilder = (contentRoute, styles) => {
    return ({ text, imgSrc } = {}) => {
        const buttonElement = button({
            text:
                text === undefined ? capitalizeFirstSymbol(contentRoute) : text,
            class_: styles,
            imgSrc
        })
        buttonElement.addEventListener("click", () => {
            switchContent(contentRoute)
        })
        return buttonElement
    }
}

const linkButtons = {
    home: createButtonBuilder("home", ["button__submit_red"]),
    login: createButtonBuilder("login"),
    register: createButtonBuilder("register"),
    error: createButtonBuilder("error"),
    serverError: createButtonBuilder("serverError"),
    profileSettings: createButtonBuilder("profileSettings")
}

export { linkButtons }

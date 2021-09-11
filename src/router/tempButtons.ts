import { Button, IButtonParams, IButtonProps } from "../components/button"
import { switchContent } from "./router"
import { capitalizeFirstSymbol } from "../utils/utils"
import { Block } from "../block"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

// Чтобы избежать циклический импорт, пришлось повозиться и некоторые вещи
// сделать криво, но сейчас линтер не ругается. Когда будет нормальный роутинг
// уберу это безобразие

type ButtonBuilder = (
    { text, imgSrc, rootClass, imgStyle }: IButtonProps,
    page: () => Block
) => Button

const createButtonBuilder = (
    contentRoute: string,
    styles?: string | string[]
): ButtonBuilder => {
    return (
        { text, imgSrc, rootClass, imgStyle }: IButtonProps,
        page: () => Block
    ): Button => {
        const params: IButtonParams = {
            // Проверяем работоспособность присвоения Id
            settings: { withInternalID: true },
            events: {
                click: switchContent.bind(null, page)
            },
            props: {
                text:
                    text === undefined
                        ? capitalizeFirstSymbol(contentRoute)
                        : text,
                rootClass: rootClass === undefined ? styles : rootClass,
                imgSrc,
                imgStyle
            }
        }
        return new Button(params)
    }
}

export const linkButtons = {
    home: createButtonBuilder("home"),
    login: createButtonBuilder("login"),
    register: createButtonBuilder("register"),
    error: createButtonBuilder("error"),
    serverError: createButtonBuilder("serverError"),
    profileSettings: createButtonBuilder("profileSettings")
}

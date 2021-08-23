import { button } from "../components/button/index.js"
import { switchContent } from "./router.js"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

const linkButtons = {
    home: () => {
        const buttonElement = button({
            buttonName: "Home",
            classList: ["button__submit_red"]
        })
        buttonElement.addEventListener("click", () => {
            switchContent("home")
        })
        return buttonElement
    },
    login: () => {
        const buttonElement = button({ buttonName: "Login" })
        buttonElement.addEventListener("click", () => {
            switchContent("login")
        })
        return buttonElement
    },
    register: () => {
        const buttonElement = button({ buttonName: "Register" })
        buttonElement.addEventListener("click", () => {
            switchContent("register")
        })
        return buttonElement
    },
    error: () => {
        const buttonElement = button({ buttonName: "Error" })
        buttonElement.addEventListener("click", () => {
            switchContent("error")
        })
        return buttonElement
    },
    serverError: () => {
        const buttonElement = button({ buttonName: "Server error" })
        buttonElement.addEventListener("click", () => {
            switchContent("serverError")
        })
        return buttonElement
    },
    profileSettings: () => {
        const buttonElement = button({ buttonName: "Settings" })
        buttonElement.addEventListener("click", () => {
            switchContent("profileSettings")
        })
        return buttonElement
    }
}

export { linkButtons }

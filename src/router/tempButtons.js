import { button } from "../components/button/index.js"
import { switchContent } from "./router.js"

// Это тоже временный файл на первый спринт. Отсюда раздаю себе кнопки
// для перехода

const linkButtons = {
    home: button({
        buttonName: "Home",
        classList: ["button__submit_red"]
    }),
    login: button({ buttonName: "Login" }),
    register: button({ buttonName: "Register" }),
    404: button({ buttonName: "Error" }),
    500: button({ buttonName: "Server error" }),
    profileSettings: button({ buttonName: "Settings" })
}

for (const [buttonName, button] of Object.entries(linkButtons)) {
    button.addEventListener("click", () => {
        switchContent(buttonName)
    })
}

export { linkButtons }

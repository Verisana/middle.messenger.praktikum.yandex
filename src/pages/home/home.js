import styles from "./home.css"
import homeTemplate from "./home.hbs"
import { string2DomElement, onSubmitMock, convertStyles2Strings } from "../../utils/utils.js"
import { inputField } from "../../components/inputField/index.js"
import { submitForm } from "../../components/submitForm/index.js"
import { button } from "../../components/button/index.js"
import { message } from "../../components/message/index.js"
import { chatSideBar } from "../../components/chatSideBar/index.js"
import { linkButtons } from "../../router/tempButtons.js"
import { isLogged } from "../../consts.js"

const chatSideBarList = [
    chatSideBar({
        messageRead: false,
        contactName: "Contact",
        contactId: "1",
        messageElement: message({
            sender: "owner",
            text: "Текст сообщения",
            timeMachine: "12:45:01.235",
            timeHuman: "12:45",
            messageId: "10"
        })
    }),
    chatSideBar({
        messageRead: true,
        contactName: "Contact_2",
        contactId: "2",
        messageElement: message({
            sender: "owner",
            text: "Текст сообщения 2",
            timeMachine: "12:45:01.235",
            timeHuman: "12:45",
            messageId: "11"
        })
    }),
    chatSideBar({
        messageRead: true,
        contactName: "Contact_3",
        contactId: "3",
        messageElement: message({
            sender: "companion",
            text: "Текст сообщения 3",
            timeMachine: "12:45:01.235",
            timeHuman: "12:45",
            messageId: "12"
        })
    })
]

const messages = [
    message({
        sender: "owner",
        text: "Привет!",
        timeMachine: "12:45:01.235",
        timeHuman: "12:45",
        messageId: "1",
        classList: ["message_right"]
    }),
    message({
        sender: "companion",
        text: "Прив",
        timeMachine: "12:46:02.23",
        timeHuman: "12:46",
        messageId: "2",
        classList: ["message_left"]
    }),
    message({
        sender: "owner",
        text: "Ты будешь завтра на вебинаре?",
        timeMachine: "12:47:01:68",
        timeHuman: "12:47",
        messageId: "3",
        classList: ["message_right"]
    }),
    message({
        sender: "companion",
        text: "Да, планирую",
        timeMachine: "12:48:03.39",
        timeHuman: "12:48",
        messageId: "4",
        classList: ["message_left"]
    }),
    message({
        sender: "companion",
        text: "А ты?",
        timeMachine: "12:48:45.355",
        timeHuman: "12:48",
        messageId: "5",
        classList: ["message_left"]
    }),
    message({
        sender: "owner",
        text: "Ага, тоже",
        timeMachine: "12:49:25.355",
        timeHuman: "12:49",
        messageId: "6",
        classList: ["message_right"]
    })
]

const buildMessageInputForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            input_: {
                type: "text",
                name: "message",
                required: true
            },
            label_: {
                text: "Сообщение"
            }
        })
    ]
    const submitBuilder = button.bind(null, {
        text: "Отправить",
        type_: "submit"
    })
    return submitForm({
        inputBuilders,
        submitBuilder,
        isNoBorder: true,
        onSubmitFunc: onSubmitMock
    })
}

export const placeholders = {
    chatSideBarPlace: "home-chat-sidebar-list",
    messagesPlace: "home-chat-messages-list",
    textInputPlace: "home-input-message-field",
    buttonToLogin: "home-button-to-login",
    buttonToRegister: "home-button-to-register"
}

export const homeContent = () => {
    const params = {
        isLogged,
        class_: convertStyles2Strings([styles], "main_home"),
        ...placeholders
    }
    const content = string2DomElement(homeTemplate(params))

    if (isLogged) {
        const chatSideBarDiv = content.querySelector(
            `#${placeholders.chatSideBarPlace}`
        )
        for (const chatSideBar of chatSideBarList) {
            chatSideBarDiv.appendChild(chatSideBar)
        }

        const messagesDiv = content.querySelector(
            `#${placeholders.messagesPlace}`
        )
        for (const message of messages) {
            messagesDiv.appendChild(message)
        }

        const textInputDiv = content.querySelector(
            `#${placeholders.textInputPlace}`
        )
        textInputDiv.appendChild(buildMessageInputForm())
    } else {
        const buttonToLoginDiv = content.querySelector(
            `#${placeholders.buttonToLogin}`
        )
        buttonToLoginDiv.appendChild(
            linkButtons.login({ text: "Залогиниться" })
        )
        const buttonToRegisterDiv = content.querySelector(
            `#${placeholders.buttonToRegister}`
        )
        buttonToRegisterDiv.appendChild(
            linkButtons.register({ text: "Зарегистрироваться" })
        )
    }
    return content
}

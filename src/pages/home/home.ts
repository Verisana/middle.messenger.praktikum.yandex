import styles from "./home.css"
import homeTemplate from "./home.hbs"
import {
    string2DomElement,
    onSubmitMock,
    convertStyles2Strings,
    selectPlaceholder
} from "../../utils/utils"
import { inputField } from "../../components/inputField"
import { submitForm } from "../../components/submitForm"
import { button } from "../../components/button"
import { message } from "../../components/message"
import { chatSideBar } from "../../components/chatSideBar"
import { linkButtons } from "../../router/tempButtons"
import { isLogged } from "../../consts"

const chatSideBarList = [
    chatSideBar({
        messageIsRead: false,
        contactName: "Contact",
        contactId: 1,
        messageElement: message({
            sender: "owner",
            text: "Текст сообщения",
            timeMachine: "12:45:01.235",
            timeHuman: "12:45",
            messageId: 10
        })
    }),
    chatSideBar({
        messageIsRead: true,
        contactName: "Contact_2",
        contactId: 2,
        messageElement: message({
            sender: "owner",
            text: "Текст сообщения 2",
            timeMachine: "12:45:01.235",
            timeHuman: "12:45",
            messageId: 11
        })
    }),
    chatSideBar({
        messageIsRead: true,
        contactName: "Contact_3",
        contactId: 3,
        messageElement: message({
            sender: "companion",
            text: "Текст сообщения 3",
            timeMachine: "12:45:01.235",
            timeHuman: "12:45",
            messageId: 12
        })
    })
]

const messages = [
    message({
        sender: "owner",
        text: "Привет!",
        timeMachine: "12:45:01.235",
        timeHuman: "12:45",
        messageId: 1,
        classList: ["message_right"]
    }),
    message({
        sender: "companion",
        text: "Прив",
        timeMachine: "12:46:02.23",
        timeHuman: "12:46",
        messageId: 2,
        classList: ["message_left"]
    }),
    message({
        sender: "owner",
        text: "Ты будешь завтра на вебинаре?",
        timeMachine: "12:47:01:68",
        timeHuman: "12:47",
        messageId: 3,
        classList: ["message_right"]
    }),
    message({
        sender: "companion",
        text: "Да, планирую",
        timeMachine: "12:48:03.39",
        timeHuman: "12:48",
        messageId: 4,
        classList: ["message_left"]
    }),
    message({
        sender: "companion",
        text: "А ты?",
        timeMachine: "12:48:45.355",
        timeHuman: "12:48",
        messageId: 5,
        classList: ["message_left"]
    }),
    message({
        sender: "owner",
        text: "Ага, тоже",
        timeMachine: "12:49:25.355",
        timeHuman: "12:49",
        messageId: 6,
        classList: ["message_right"]
    })
]

const buildMessageInputForm = () => {
    const inputBuilders = [
        inputField.bind(null, {
            inputPart: {
                type: "text",
                name: "message",
                required: true
            },
            label: {
                text: "Сообщение"
            }
        })
    ]
    const submitBuilder = button.bind(null, {
        text: "От   править",
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
        const chatSideBarDiv = selectPlaceholder(
            content,
            placeholders.chatSideBarPlace
        )
        for (const chatSideBarElement of chatSideBarList) {
            chatSideBarDiv.appendChild(chatSideBarElement)
        }

        const messagesDiv = selectPlaceholder(
            content,
            placeholders.messagesPlace
        )
        for (const messageElement of messages) {
            messagesDiv.appendChild(messageElement)
        }

        const textInputDiv = selectPlaceholder(
            content,
            placeholders.textInputPlace
        )
        textInputDiv.appendChild(buildMessageInputForm())
    } else {
        const buttonToLoginDiv = selectPlaceholder(
            content,
            placeholders.buttonToLogin
        )
        buttonToLoginDiv.appendChild(
            linkButtons.login({ text: "Залогиниться" })
        )

        const buttonToRegisterDiv = selectPlaceholder(
            content,
            placeholders.buttonToRegister
        )
        buttonToRegisterDiv.appendChild(
            linkButtons.register({ text: "Зарегистрироваться" })
        )
    }
    return content
}

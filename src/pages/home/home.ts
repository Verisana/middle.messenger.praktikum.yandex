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
import { Message } from "../../components/message"
import { ChatSideBar } from "../../components/chatSideBar"
import { linkButtons } from "../../router/tempButtons"
import { isLogged } from "../../consts"
import { loginContent } from "../auth/login"
import { registerContent } from "../auth/register"
import { Button } from "../../components/button"

const chatSideBarList = [
    new ChatSideBar({
        props: {
            messageIsRead: false,
            contactName: "Contact",
            contactId: 1,
            Message: new Message({
                props: {
                    sender: "owner",
                    text: "Текст сообщения",
                    timeMachine: "12:45:01.235",
                    timeHuman: "12:45",
                    messageId: 10
                }
            })
        }
    }),
    new ChatSideBar({
        props: {
            messageIsRead: true,
            contactName: "Contact_2",
            contactId: 2,
            Message: new Message({
                props: {
                    sender: "owner",
                    text: "Текст сообщения 2",
                    timeMachine: "12:45:01.235",
                    timeHuman: "12:45",
                    messageId: 11
                }
            })
        }
    }),
    new ChatSideBar({
        props: {
            messageIsRead: true,
            contactName: "Contact_3",
            contactId: 3,
            Message: new Message({
                props: {
                    sender: "companion",
                    text: "Текст сообщения 3",
                    timeMachine: "12:45:01.235",
                    timeHuman: "12:45",
                    messageId: 12
                }
            })
        }
    })
]

const messages = [
    new Message({
        props: {
            sender: "owner",
            text: "Привет!",
            timeMachine: "12:45:01.235",
            timeHuman: "12:45",
            messageId: 1,
            rootClass: ["message_right"]
        }
    }),
    new Message({
        props: {
            sender: "companion",
            text: "Прив",
            timeMachine: "12:46:02.23",
            timeHuman: "12:46",
            messageId: 2,
            rootClass: ["message_left"]
        }
    }),
    new Message({
        props: {
            sender: "owner",
            text: "Ты будешь завтра на вебинаре?",
            timeMachine: "12:47:01:68",
            timeHuman: "12:47",
            messageId: 3,
            rootClass: ["message_right"]
        }
    }),
    new Message({
        props: {
            sender: "companion",
            text: "Да, планирую",
            timeMachine: "12:48:03.39",
            timeHuman: "12:48",
            messageId: 4,
            rootClass: ["message_left"]
        }
    }),
    new Message({
        props: {
            sender: "companion",
            text: "А ты?",
            timeMachine: "12:48:45.355",
            timeHuman: "12:48",
            messageId: 5,
            rootClass: ["message_left"]
        }
    }),
    new Message({
        props: {
            sender: "owner",
            text: "Ага, тоже",
            timeMachine: "12:49:25.355",
            timeHuman: "12:49",
            messageId: 6,
            rootClass: ["message_right"]
        }
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
    const submitBuilder = () => {
        const content = new Button({
            props: {
                text: "Отправить",
                type_: "submit"
            }
        }).getContent()
        if (content === null) throw new Error("Content can not be empty")
        return content
    }
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
            chatSideBarDiv.appendChild(chatSideBarElement.getContent())
        }

        const messagesDiv = selectPlaceholder(
            content,
            placeholders.messagesPlace
        )
        for (const messageElement of messages) {
            messagesDiv.appendChild(messageElement.getContent())
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
            linkButtons.login({ text: "Залогиниться" }, loginContent).element
        )

        const buttonToRegisterDiv = selectPlaceholder(
            content,
            placeholders.buttonToRegister
        )
        buttonToRegisterDiv.appendChild(
            linkButtons.register(
                { text: "Зарегистрироваться" },
                registerContent
            ).element
        )
    }
    return content
}

import styles from "./home.css"
import homeTemplate from "./home.hbs"
import {
    onSubmitMock,
    convertStyles2Strings,
    compile2Dom
} from "../../utils/utils"
import { SubmitForm } from "../../components/submitForm"
import { Message } from "../../components/message"
import { ChatSideBar } from "../../components/chatSideBar"
import { linkButtons } from "../../router/tempButtons"
import { isLogged } from "../../consts"
import { LoginPage } from "../auth/login"
import { RegisterPage } from "../auth/register"
import { Button } from "../../components/button"
import { Block } from "../../block"
import { getMessageInput } from "../../components/inputs"

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

export class HomePage extends Block {
    constructor() {
        super({
            props: {
                isLogged,
                rootClass: convertStyles2Strings([styles], "main_home"),
                ChatsSideBar: chatSideBarList,
                Messages: messages,
                SendMessage: new SubmitForm({
                    events: {
                        submit: onSubmitMock
                    },
                    settings: { isNoBorder: true },
                    props: {
                        Inputs: getMessageInput(),
                        SubmitButton: new Button({
                            props: {
                                text: "Отправить",
                                type_: "submit"
                            }
                        })
                    }
                }),
                LoginButton: linkButtons.login(
                    { text: "Залогиниться" },
                    () => new LoginPage()
                ),
                RegisterButton: linkButtons.register(
                    { text: "Зарегистрироваться" },
                    () => new RegisterPage()
                )
            }
        })
    }

    render(): HTMLElement {
        return compile2Dom(homeTemplate, this.props)
    }
}

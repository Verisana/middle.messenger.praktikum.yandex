import styles from "./home.css"
import homeTemplate from "./home.hbs"
import {
    onSubmitMock,
    convertStyles2Strings,
    compile2Dom
} from "../../utils/utils"
import { SubmitForm } from "../../components/submitForm"
import { Message } from "../../components/message"
import { SideChat } from "../../modules/sideChat"
import { linkButtons } from "../../router/tempButtons"
import { isLogged } from "../../consts"
import { LoginPage } from "../auth/login"
import { RegisterPage } from "../auth/register"
import { Button } from "../../components/button"
import { Block } from "../../components/block"
import { getMessageInput } from "../../modules/inputs"
import { SideChatBar } from "../../modules/sideChatBar"
import { IHomePageParams } from "./types"
import { TimeInfo } from "../../components/timeInfo"

const sideChatList = [
    new SideChat({
        props: {
            messageIsRead: false,
            contactName: "Contact",
            contactId: 1,
            Message: new Message({
                props: {
                    sender: "owner",
                    text: "Текст сообщения",
                    messageId: 10,
                    rootClass: ["message__sidebar"]
                }
            }),
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:45:01.235",
                    timeHuman: "12:45",
                    rootClass: ["time-info__chat-side-bar"]
                }
            })
        }
    }),
    new SideChat({
        props: {
            rootClass: ["side-chat_select"],
            messageIsRead: true,
            contactName: "Contact_2",
            contactId: 2,
            Message: new Message({
                props: {
                    sender: "owner",
                    text: "Текст сообщения 2",
                    messageId: 11,
                    rootClass: ["message__sidebar"]
                }
            }),
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:45:01.235",
                    timeHuman: "12:45",
                    rootClass: ["time-info__chat-side-bar"]
                }
            })
        }
    }),
    new SideChat({
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
                    messageId: 12,
                    rootClass: ["message__sidebar"]
                }
            }),
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:45:01.235",
                    timeHuman: "12:45",
                    rootClass: ["time-info__chat-side-bar"]
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
            messageId: 1,
            rootClass: ["message__open", "message__open_right"],
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:45:01.235",
                    timeHuman: "12:45",
                    rootClass: ["time-info__open"]
                }
            })
        }
    }),
    new Message({
        props: {
            sender: "companion",
            text: "Прив",
            messageId: 2,
            rootClass: ["message__open", "message__open_left"],
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:46:02.23",
                    timeHuman: "12:46",
                    rootClass: ["time-info__open"]
                }
            })
        }
    }),
    new Message({
        props: {
            sender: "owner",
            text: "Ты будешь завтра на вебинаре?",
            messageId: 3,
            rootClass: ["message__open", "message__open_right"],
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:47:01:68",
                    timeHuman: "12:47",
                    rootClass: ["time-info__open"]
                }
            })
        }
    }),
    new Message({
        props: {
            sender: "companion",
            text: "Да, планирую",
            messageId: 4,
            rootClass: ["message__open", "message__open_left"],
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:48:03.39",
                    timeHuman: "12:48",
                    rootClass: ["time-info__open"]
                }
            })
        }
    }),
    new Message({
        props: {
            sender: "companion",
            text: "А ты?",
            messageId: 5,
            rootClass: ["message__open", "message__open_left"],
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:48:45.355",
                    timeHuman: "12:48",
                    rootClass: ["time-info__open"]
                }
            })
        }
    }),
    new Message({
        props: {
            sender: "owner",
            text: "Ага, тоже",
            messageId: 6,
            rootClass: ["message__open", "message__open_right"],
            Time: new TimeInfo({
                props: {
                    timeMachine: "12:49:25.355",
                    timeHuman: "12:49",
                    rootClass: ["time-info__open"]
                }
            })
        }
    })
]

export class HomePage extends Block {
    constructor() {
        const params: IHomePageParams = {
            props: {
                isLogged,
                rootClass: convertStyles2Strings([styles], "home"),
                SideChatBar: new SideChatBar({
                    props: {
                        SideChats: sideChatList
                    }
                }),
                Messages: messages,
                SendMessage: new SubmitForm({
                    settings: { isNoBorder: true },
                    props: {
                        events: {
                            submit: [onSubmitMock]
                        },
                        rootClass: "form__message-input",
                        Inputs: getMessageInput(),
                        SubmitButton: new Button({
                            props: {
                                text: "Отправить",
                                type_: "submit",
                                rootClass: ["button__message-submit"]
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
        }
        super(params)
    }

    render(): HTMLElement {
        return compile2Dom(homeTemplate, this.props)
    }
}

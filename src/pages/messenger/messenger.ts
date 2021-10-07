import { Block } from "../../components/block"
import styles from "./messenger.css"
import messengerTemplate from "./messenger.hbs"
import { compileToDom } from "../../utils/dom_utils"
import { SideChat } from "../../modules/sideChat"
import { Message } from "../../components/message"
import { maxMessageLength } from "../../consts"
import { TimeInfo } from "../../components/timeInfo"
import { convertStyles2Strings, onSubmitMock } from "../../utils/utils"
import { SideChatBar } from "../../modules/sideChatBar"
import { SubmitForm } from "../../components/submitForm"
import { getMessageInput } from "../../modules/inputs"
import { Button } from "../../components/button"
import { IMessengerPageParams } from "./types"

const sideChatList = [
    new SideChat({
        props: {
            messageIsRead: false,
            contactName: "Contact",
            contactId: 1,
            Message: new Message({
                settings: { maxTextLength: maxMessageLength },
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
                settings: { maxTextLength: maxMessageLength },
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
                settings: { maxTextLength: maxMessageLength },
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

export class MessengerPage extends Block {
    constructor() {
        const params: IMessengerPageParams = {
            props: {
                rootClass: convertStyles2Strings([styles], "messenger"),
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
                })
            }
        }
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(messengerTemplate, this.props)
    }
}

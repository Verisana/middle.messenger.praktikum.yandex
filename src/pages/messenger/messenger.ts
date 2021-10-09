import { Block } from "../../components/block"
import styles from "./messenger.css"
import messengerTemplate from "./messenger.hbs"
import { compileToDom } from "../../utils/dom_utils"
import { Message } from "../../components/message"
import { TimeInfo } from "../../components/timeInfo"
import { convertStylesToStrings, onSubmitMock } from "../../utils/utils"
import { SideChatBar } from "../../modules/sideChatBar"
import { SubmitForm } from "../../components/submitForm"
import { getMessageInput } from "../../modules/inputs"
import { Button } from "../../components/button"
import { IMessengerPageParams } from "./types"
import { SearchBar } from "../../modules/searchBar"
import { InputField } from "../../components/inputField"
import { chatsController } from "../../controllers"

const messages = [
    new Message({
        props: {
            senderName: "owner",
            text: "Привет!",
            senderId: 1,
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
            senderName: "companion",
            text: "Прив",
            senderId: 2,
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
            senderName: "owner",
            text: "Ты будешь завтра на вебинаре?",
            senderId: 3,
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
            senderName: "companion",
            text: "Да, планирую",
            senderId: 4,
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
            senderName: "companion",
            text: "А ты?",
            senderId: 5,
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
            senderName: "owner",
            text: "Ага, тоже",
            senderId: 6,
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

async function createChatCallback() {
    const title = prompt("Введите заголовок нового чата", "")
    if (title === "") {
        alert("Нельзя создать чат без имени")
        return
    }
    if (title !== null) {
        chatsController.create({ title })
    }
}

async function deleteChatCallback() {
    console.log("clicked")
}

async function addUserCallback() {
    console.log("clicked")
}

async function deleteUserCallback() {
    console.log("clicked")
}

export class MessengerPage extends Block {
    constructor() {
        const params: IMessengerPageParams = {
            props: {
                RemovePersonButton: new Button({
                    props: {
                        events: {
                            click: [deleteUserCallback]
                        },
                        rootClass: ["button__navbar"],
                        imgSrc: "person_remove_white_48dp.svg",
                        imgStyle: ["button__image"]
                    }
                }),
                AddPersonButton: new Button({
                    props: {
                        events: {
                            click: [addUserCallback]
                        },
                        rootClass: ["button__navbar"],
                        imgSrc: "person_add_white_48dp.svg",
                        imgStyle: ["button__image"]
                    }
                }),
                rootClass: convertStylesToStrings([styles], "messenger"),
                SideChatBar: new SideChatBar({
                    props: {
                        SideChats: [],
                        ChatCreateButton: new Button({
                            props: {
                                events: {
                                    click: [createChatCallback]
                                },
                                rootClass: ["button__navbar"],
                                imgSrc: "add_white_48dp.svg",
                                imgStyle: ["button__image"]
                            }
                        }),
                        ChatDeleteButton: new Button({
                            props: {
                                events: {
                                    click: [deleteChatCallback]
                                },
                                rootClass: ["button__navbar"],
                                imgSrc: "remove_circle_white_48dp.svg",
                                imgStyle: ["button__image"]
                            }
                        }),
                        SearchBar: new SearchBar({
                            props: {
                                SearchField: new InputField({ props: {} }),
                                SearchButton: new Button({
                                    props: {
                                        events: {
                                            click: [
                                                () => console.log("clicked!")
                                            ]
                                        },
                                        rootClass: ["button__navbar"],
                                        imgSrc: "search_white_48dp.svg",
                                        imgStyle: ["button__image"]
                                    }
                                })
                            }
                        })
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

    async componentBeforeMount() {
        await chatsController.get()
    }

    render(): HTMLElement {
        return compileToDom(messengerTemplate, this.props)
    }
}

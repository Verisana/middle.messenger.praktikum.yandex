import { Block } from "../../components/block"
import styles from "./messenger.css"
import messengerTemplate from "./messenger.hbs"
import { compileToDom } from "../../utils/dom_utils"
import { appendEvent, convertStylesToStrings } from "../../utils/utils"
import { ISideChatBarProps, SideChatBar } from "../../modules/sideChatBar"
import { SubmitForm } from "../../components/submitForm"
import {
    getAvatarInput,
    getMessageInput,
    getSearchInput
} from "../../modules/inputs"
import { Button } from "../../components/button"
import { IMessengerPageParams } from "./types"
import {
    chatsController,
    messagesController,
    submitControllerBuilder
} from "../../controllers"
import { SideChat } from "../../modules/sideChat"
import { getSelectedSideChat } from "./utils"
import { store } from "../../store"
import { inputFieldNames } from "../../consts"

export class MessengerPage extends Block {
    constructor() {
        const params: IMessengerPageParams = {
            props: {
                ChatAvatarSubmit: new SubmitForm({
                    settings: {
                        isNoBorder: true
                    },
                    props: {
                        events: {
                            submit: [
                                submitControllerBuilder(
                                    chatsController.updateAvatar.bind(
                                        chatsController
                                    )
                                )
                            ]
                        },
                        Inputs: getAvatarInput(),
                        SubmitButton: new Button({
                            props: {
                                text: "Загрузить",
                                type_: "submit"
                            }
                        })
                    }
                }),
                UsersButton: new Button({
                    props: {
                        rootClass: ["button__navbar"],
                        imgSrc: "people_white_48dp.svg",
                        imgStyle: ["button__image"]
                    }
                }),
                RemovePersonButton: new Button({
                    props: {
                        rootClass: ["button__navbar"],
                        imgSrc: "person_remove_white_48dp.svg",
                        imgStyle: ["button__image"]
                    }
                }),
                AddPersonButton: new Button({
                    props: {
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
                                rootClass: ["button__navbar"],
                                imgSrc: "add_white_48dp.svg",
                                imgStyle: ["button__image"]
                            }
                        }),
                        ChatDeleteButton: new Button({
                            props: {
                                rootClass: ["button__navbar"],
                                imgSrc: "remove_circle_white_48dp.svg",
                                imgStyle: ["button__image"]
                            }
                        }),
                        SearchBar: new SubmitForm({
                            settings: {
                                isNoBorder: true
                            },
                            props: {
                                Inputs: getSearchInput(),
                                SubmitButton: new Button({
                                    props: {
                                        type_: "submit",
                                        rootClass: ["button__navbar"],
                                        imgSrc: "search_white_48dp.svg",
                                        imgStyle: ["button__image"]
                                    }
                                })
                            }
                        })
                    }
                }),
                SendMessage: new SubmitForm({
                    settings: { isNoBorder: true },
                    props: {
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
        const sideChatBarProps = params.props.SideChatBar
            .props as ISideChatBarProps

        sideChatBarProps.ChatCreateButton.props.events = appendEvent(
            "click",
            this.createChatClicked.bind(this),
            sideChatBarProps.ChatCreateButton.props.events
        )

        sideChatBarProps.ChatDeleteButton.props.events = appendEvent(
            "click",
            this.deleteChatClicked.bind(this),
            sideChatBarProps.ChatDeleteButton.props.events
        )

        sideChatBarProps.SearchBar.props.events = appendEvent(
            "submit",
            submitControllerBuilder(this.searchBarClicked.bind(this)),
            sideChatBarProps.SearchBar.props.events
        )

        params.props.AddPersonButton.props.events = appendEvent(
            "click",
            this.addUserClicked.bind(this),
            params.props.AddPersonButton.props.events
        )

        params.props.RemovePersonButton.props.events = appendEvent(
            "click",
            this.deleteUserClicked.bind(this),
            params.props.RemovePersonButton.props.events
        )

        params.props.UsersButton.props.events = appendEvent(
            "click",
            this.showUsersClicked.bind(this),
            params.props.UsersButton.props.events
        )

        params.props.SendMessage.props.events = appendEvent(
            "submit",
            submitControllerBuilder(
                messagesController.sendMessage.bind(messagesController)
            ),
            params.props.SendMessage.props.events
        )
    }

    async createChatClicked() {
        const title = prompt("Введите заголовок нового чата", "")
        if (title === null || title === "") {
            alert("Нельзя создать чат без имени")
            return
        }
        await chatsController.create(title)
    }

    async deleteChatClicked() {
        const selected = store.select("selectedChat") as SideChat | undefined
        if (selected !== undefined) {
            chatsController.delete(selected)
        } else {
            alert("Для удаления нужно сначала выбрать чат")
        }
    }

    async addUserClicked() {
        const searchLogin = prompt("Введите логин пользователя для поиска")
        if (searchLogin === null || searchLogin === "") {
            if (searchLogin === "") {
                alert("Логин не может быть пустым")
            }
            return
        }
        const sideChats = (this.props.SideChatBar as SideChatBar).props
            .SideChats as SideChat[]
        const selected = getSelectedSideChat(sideChats)
        await chatsController.addUsers(searchLogin, selected)
    }

    async deleteUserClicked() {
        const searchLogin = prompt("Введите логин пользователя для удаления")
        if (searchLogin === null || searchLogin === "") {
            if (searchLogin === "") {
                alert("Логин не может быть пустым")
            }
            return
        }
        const sideChats = (this.props.SideChatBar as SideChatBar).props
            .SideChats as SideChat[]
        const selected = getSelectedSideChat(sideChats)
        await chatsController.deleteUsers(searchLogin, selected)
    }

    async searchBarClicked(data: FormData) {
        const query = data.get(inputFieldNames.searchQuery)
        store.setValue("chatsSearchQuery", query)
        await chatsController.get()
    }

    async showUsersClicked() {
        const sideChats = (this.props.SideChatBar as SideChatBar).props
            .SideChats as SideChat[]

        const selected = getSelectedSideChat(sideChats)
        await chatsController.showUsersInChat(selected)
    }

    async componentBeforeMount() {
        await chatsController.get()
    }

    render(): HTMLElement {
        return compileToDom(messengerTemplate, this.props)
    }
}

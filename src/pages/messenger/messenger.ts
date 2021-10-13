import { Block, BlockParams } from "../../components/block"
import styles from "./messenger.css"
import { appendEvent, convertStylesToStrings } from "../../utils/utils"
import { SideChatBar } from "../../modules/sideChatBar"
import { SubmitForm } from "../../components/submitForm"
import {
    getAvatarInput,
    getMessageInput,
    getSearchInput
} from "../../modules/inputs"
import { Button } from "../../components/button"
import { IMessengerPageProps } from "./types"
import {
    chatsController,
    messagesController,
    submitControllerBuilder
} from "../../controllers"
import { SideChat, getSelectedSideChat } from "../../modules/sideChat"
import { store } from "../../store"
import { globalEvents, inputFieldNames } from "../../consts"
import { globalEventBus } from "../../utils/event_bus"
import { constructMessages } from "../../controllers/utils"
import { IChatsResponse } from "../../api"

export class MessengerPage extends Block<IMessengerPageProps> {
    constructor() {
        const params: BlockParams<IMessengerPageProps> = {
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

        globalEventBus().on(
            globalEvents.messengerMessagesUpdate,
            this.receiveMessagesFromStore.bind(this)
        )

        const sideChatBarProps = params.props.SideChatBar.props

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

    receiveMessagesFromStore() {
        this.props.Messages = constructMessages()
    }

    async createChatClicked() {
        const title = prompt("Введите заголовок нового чата", "")
        if (title === null || title === "") {
            alert("Нельзя создать чат без имени")
            return
        }
        const { chats } = store.data
        if (chats !== undefined) {
            const duplicate = chats.filter((chat) => {
                return chat.title === title
            })
            if (duplicate.length > 0) {
                alert("Нельзя создавать чаты с одинаковыми именами")
                return
            }
        }
        await chatsController.create(title)
    }

    async deleteChatClicked() {
        const selected = store.select("selectedChat") as
            | IChatsResponse
            | undefined
        if (selected !== undefined) {
            if (
                // eslint-disable-next-line
                confirm(
                    `Вы действительно хотите удалить ${selected.title} чат?`
                )
            ) {
                chatsController.delete(Number(selected.id))
            }
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

    render(): [string, IMessengerPageProps] {
        return [
            /*html*/ `
            <main class="{{rootClass}}">
                {{{SideChatBar}}}
                <div>
                    <div>
                        {{{ChatAvatarSubmit}}}
                        {{{UsersButton}}}
                        {{{RemovePersonButton}}}
                        {{{AddPersonButton}}}
                    </div>
                    {{#each Messages}}
                        <div>
                            {{{this}}}
                        </div>
                    {{/each}}
                    {{{SendMessage}}}
                </div>
            </main>
        `,
            this.props
        ]
    }
}

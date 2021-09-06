import styles from "./chatSideBar.css"
import layoutStyles from "../../layout/layout.css"
import chatSideBarTemplate from "./chatSideBar.hbs"
import {
    string2DomElement,
    convertStyles2Strings,
    selectPlaceholder
} from "../../utils/utils"
import { defaultAvatar, maxMessageLength } from "../../consts"
import { IChatSideBar } from "./types"

export const placeholders = {
    messagePlace: "chat-sidebar-contact-last-message"
}

export const chatSideBar = ({
    messageElement,
    classList,
    messageIsRead,
    avatarSrc,
    contactName,
    contactId
}: IChatSideBar) => {
    const params = {
        class_: convertStyles2Strings([styles], "chatSideBar_main", classList),
        avatarSrc: avatarSrc === undefined ? defaultAvatar : avatarSrc,
        messageIsRead,
        contactName,
        contactId,
        imgStyles: convertStyles2Strings([layoutStyles], "img__avatar_small"),
        ...placeholders
    }
    const element = string2DomElement(chatSideBarTemplate(params))
    const messagePlaceDiv = selectPlaceholder(
        element,
        placeholders.messagePlace
    )
    const { textContent } = messageElement
    messageElement.textContent =
        textContent !== null ? textContent.slice(0, maxMessageLength) : null

    messagePlaceDiv.appendChild(messageElement)
    return element
}

import styles from "./chatSideBar.css"
import layoutStyles from "../../layout/layout.css"
import chatSideBarTemplate from "./chatSideBar.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils.js"
import { defaultAvatar } from "../../consts"
import { maxMessageLength } from "../../consts.js"

export const placeholders = {
    messagePlace: "chat-sidebar-contact-last-message"
}

export const chatSideBar = ({
    classList,
    messageIsRead,
    avatarSrc,
    contactName,
    contactId,
    messageElement
} = {}) => {
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
    const messagePlaceDiv = element.querySelector(
        `#${placeholders.messagePlace}`
    )
    messageElement.textContent = messageElement.textContent.slice(
        0,
        maxMessageLength
    )
    messagePlaceDiv.appendChild(messageElement)
    return element
}
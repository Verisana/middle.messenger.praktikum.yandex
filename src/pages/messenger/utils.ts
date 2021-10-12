import { IChatsResponse } from "../../api"
import { SideChat } from "../../modules/sideChat"

export function getSelectedSideChat(
    sideChats: SideChat[]
): IChatsResponse | undefined {
    const selected = sideChats.filter((sideChat) => {
        if (sideChat.props.selected === true) {
            return true
        }
        return false
    })
    if (selected.length > 1) {
        throw new Error(
            "Received two or more selected objects. Something is wrong"
        )
    } else if (selected.length !== 0) {
        return {
            id: String(selected[0].props.chatId),
            avatar:
                selected[0].props.avatarSrc === undefined
                    ? ""
                    : selected[0].props.avatarSrc,
            title: selected[0].props.chatTitle,
            unread_count: 0,
            last_message: {
                user: {
                    login: selected[0].props.Message.props.senderName,
                    first_name: "",
                    second_name: "",
                    email: "",
                    phone: "",
                    avatar: ""
                },
                time:
                    selected[0].props.Message.props.Time?.props.timeMachine ===
                    undefined
                        ? ""
                        : selected[0].props.Message.props.Time?.props
                              .timeMachine,
                timeHuman:
                    selected[0].props.Message.props.Time?.props.timeHuman ===
                    undefined
                        ? ""
                        : selected[0].props.Message.props.Time?.props.timeHuman,
                content: selected[0].props.Message.props.text
            }
        }
    }
    return undefined
}

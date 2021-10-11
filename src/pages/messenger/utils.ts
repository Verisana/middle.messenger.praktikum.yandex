import { SideChat } from "../../modules/sideChat"

export function getSelectedSideChat(
    sideChats: SideChat[]
): SideChat | undefined {
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
        return selected[0]
    }
    return undefined
}

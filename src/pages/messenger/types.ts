import { BlockParams, Props } from "../../components/block"
import { Button } from "../../components/button"
import { Message } from "../../components/message"
import { SubmitForm } from "../../components/submitForm"
import { SideChatBar } from "../../modules/sideChatBar"

export interface IMessengerPageProps extends Props {
    SideChatBar: SideChatBar
    SendMessage: SubmitForm
    ChatAvatarSubmit: SubmitForm
    UsersButton: Button
    RemovePersonButton: Button
    AddPersonButton: Button
    rootClass?: string | string[]
    Messages?: Message[]
}

export interface IMessengerPageParams extends BlockParams {
    props: IMessengerPageProps
}

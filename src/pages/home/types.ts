import { BlockParams, Props } from "../../components/block"
import { Button } from "../../components/button"
import { Message } from "../../components/message"
import { SubmitForm } from "../../components/submitForm"
import { SideChatBar } from "../../components/sideChatBar"

export interface IHomePageProps extends Props {
    isLogged: boolean
    SideChatBar: SideChatBar
    SendMessage: SubmitForm
    LoginButton: Button
    RegisterButton: Button
    rootClass?: string | string[]
    Messages?: Message[]
}

export interface IHomePageParams extends BlockParams {
    props: IHomePageProps
}

import { BlockParams, Props } from "../../block"
import { Button } from "../../components/button"
import { Message } from "../../components/message"
import { SubmitForm } from "../../components/submitForm"
import { SideChatBar } from "../../components/sideChatBar"
import { TimeInfo } from "../../components/timeInfo"

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

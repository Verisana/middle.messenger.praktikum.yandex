import { BlockParams, Props } from "../../block"
import { Button } from "../../components/button"
import { ChatSideBar } from "../../components/chatSideBar"
import { Message } from "../../components/message"
import { SubmitForm } from "../../components/submitForm"

export interface IHomePageProps extends Props {
    isLogged: boolean
    ChatsSideBar: ChatSideBar[]
    SendMessage: SubmitForm
    LoginButton: Button
    RegisterButton: Button
    rootClass?: string | string[]
    Messages?: Message[]
}

export interface IHomePageParams extends BlockParams {
    props: IHomePageProps
}

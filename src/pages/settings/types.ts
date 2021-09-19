import { BlockParams, Props } from "../../components/block"
import { Button } from "../../components/button"
import { SubmitForm } from "../../components/submitForm"

export interface ISettingsPageProps extends Props {
    SettingsForm: SubmitForm
    HomeButton: Button
    avatarStyle: string | string[]
    linkToImage: string
}

export interface ISettingsPageParams extends BlockParams {
    props: ISettingsPageProps
}

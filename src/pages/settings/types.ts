import { Props } from "../../components/block"
import { Button } from "../../components/button"
import { SubmitForm } from "../../components/submitForm"

export interface ISettingsPageProps extends Props {
    SettingsForm: SubmitForm
    AvatarForm: SubmitForm
    PasswordForm: SubmitForm
    HomeButton: Button
    avatarStyle: string | string[]
    avatarLink: string
}

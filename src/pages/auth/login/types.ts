import { BlockParams, Props } from "../../../components/block"
import { Button } from "../../../components/button"
import { SubmitForm } from "../../../components/submitForm"

export interface ILoginPageProps extends Props {
    LoginSubmitForm: SubmitForm
    RegisterButton: Button
}

export interface ILoginPageParams extends BlockParams {
    props: ILoginPageProps
}

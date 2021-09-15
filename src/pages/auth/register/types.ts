import { Props, BlockParams } from "../../../components/block"
import { Button } from "../../../components/button"
import { SubmitForm } from "../../../components/submitForm"

export interface IRegisterPageProps extends Props {
    RegisterSubmitForm: SubmitForm
    LoginButton: Button
}

export interface IRegisterPageParams extends BlockParams {
    props: IRegisterPageProps
}

import { BlockParams, Props } from "../../components/block"
import { Button } from "../../components/button";
import { InputField } from "../../components/inputField";

export interface ISearchBarProps extends Props {
    rootClass?: string | string[]
    SearchField: InputField
    SearchButton: Button
}

export interface ISearchBarParams extends BlockParams {
    props: ISearchBarProps
}

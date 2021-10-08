import styles from "./searchBar.css"
import SearchBarTemplate from "./searchBar.hbs"
import { Block } from "../../components/block"
import { compileToDom } from "../../utils/dom_utils"
import { ISearchBarParams } from "."
import { convertStylesToStrings } from "../../utils/utils"

export class SearchBar extends Block {
    constructor(params: ISearchBarParams) {
        const { props } = params
        props.rootClass = convertStylesToStrings([styles], props.rootClass)
        super(params)
    }

    render(): HTMLElement {
        return compileToDom(SearchBarTemplate, this.props)
    }
}

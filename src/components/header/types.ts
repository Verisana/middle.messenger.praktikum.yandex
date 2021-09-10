import { Props } from "../../block"
import { Button } from "../button"

export interface IHeaderProps extends Props {
    isLogged: boolean
    logoStyles: string
    menuButton: Button
    settingsButton: Button
}

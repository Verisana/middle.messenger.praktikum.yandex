import { Props } from "../block"
import { Button } from "../button"
import { Logo } from "../logo/logo"

export interface IHeaderProps extends Props {
  isLogged: boolean
  MenuButton: Button
  SettingsButton: Button
  LogoutButton: Button
  Logo: Logo
}

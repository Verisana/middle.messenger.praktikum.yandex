import { IMessengerPageProps, MessengerPage } from "./messenger"
import { ErrorPage } from "./errors/404"
import { ServerErrorPage } from "./errors/500"
import { ILoginPageProps, LoginPage } from "./auth/login"
import { IRegisterPageProps, RegisterPage } from "./auth/register"
import { ISettingsPageProps, SettingsPage } from "./settings"
import { Block, Props } from "../components/block"

export interface IPages {
  login: () => Block<ILoginPageProps>
  register: () => Block<IRegisterPageProps>
  messenger: () => Block<IMessengerPageProps>
  profileSettings: () => Block<ISettingsPageProps>
  error: () => Block<Props>
  serverError: () => Block<Props>
}

export const pages: IPages = {
  login: () => new LoginPage(),
  register: () => new RegisterPage(),
  messenger: () => new MessengerPage(),
  profileSettings: () => new SettingsPage(),
  error: () => new ErrorPage(),
  serverError: () => new ServerErrorPage()
}

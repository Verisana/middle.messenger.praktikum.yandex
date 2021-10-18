import { Block, Props } from "../components/block"
import { Footer } from "../components/footer"
import { Header } from "../components/header"

export interface ILayoutProps<T extends Props> extends Props {
  Content: Block<T>
  Header?: Header
  Footer?: Footer
}

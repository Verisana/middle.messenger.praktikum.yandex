import { Block, BlockParams, Props } from "../block"
import { Footer } from "../components/footer"
import { Header } from "../components/header"

export interface ILayoutProps extends Props {
    Content: Block
    Header?: Header
    Footer?: Footer
}

export interface ILayoutParams extends BlockParams {
    props: ILayoutProps
}

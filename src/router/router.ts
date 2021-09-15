import { Block } from "../components/block"
import { ILayoutProps, layout } from "../layout"

// Пока мы не дошли до роутинга, чтобы не плодить лишние html файлы, которые
// меня печалят, решил использовать эту заглушку, чтобы отображать страницы

export const switchContent = (content: () => Block) => {
    const props = layout.props as ILayoutProps
    props.Content = content()
}

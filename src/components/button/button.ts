import styles from "./button.css"
import buttonTemplate from "./button.hbs"
import { string2DomElement, convertStyles2Strings } from "../../utils/utils"
import { IButton } from "./types"

export const button = ({
    text,
    class_,
    type_ = "button",
    imgSrc,
    imgStyle
}: IButton): Element => {
    const params = {
        class_: convertStyles2Strings([styles], "btn", class_),
        text,
        type_,
        imgSrc,
        imgStyle:
            imgStyle !== undefined
                ? convertStyles2Strings([styles], imgStyle)
                : undefined
    }
    return string2DomElement(buttonTemplate(params))
}

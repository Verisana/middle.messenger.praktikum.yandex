interface IStyle {
  [key: string]: string
}

declare module "*.css" {
  const styles: IStyle
  export default styles
}

declare module "*.hbs" {
  import { Template } from "handlebars"

  export default Template<string>()
}

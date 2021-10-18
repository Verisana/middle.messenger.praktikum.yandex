interface IStyle {
  [key: string]: string
}

declare module "*.css" {
  const styles: IStyle
  export default styles
}

declare module "*.jpg" {
  export default string
}

declare module "*svg" {
  export default string
}

declare module "*png" {
  export default string
}

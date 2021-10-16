import "./500.css"
import errorImage from "../../../../static/500_img.jpg"
import { Block, Props } from "../../../components/block"

export class ServerErrorPage extends Block<Props> {
  constructor() {
    super({ props: {} })
  }

  render(): [string, Props] {
    return [
      /*html*/ `
            <main>
                <h1>Ошибка 500</h1>
                <h2>Сервер не отвечает</h2>
                <h3>Мы уже решаем проблему. Попробуйте зайти позже</h3>
                <img src="${errorImage}" alt="Jedi 500 error meme" />
            </main>
        `,
      this.props
    ]
  }
}

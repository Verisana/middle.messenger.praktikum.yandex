import "./500.css"
import { Block } from "../../../components/block"

export class ServerErrorPage extends Block {
    constructor() {
        super({ props: {} })
    }

    render(): HTMLElement {
        return this._compile(
            /*html*/ `
            <main>
                <h1>Ошибка 500</h1>
                <h2>Сервер не отвечает</h2>
                <h3>Мы уже решаем проблему. Попробуйте зайти позже</h3>
                <img src="500_img.jpg" alt="Jedi 500 error meme" />
            </main>
        `,
            this.props
        )
    }
}

import "./404.css"
import { Block, Props } from "../../../components/block"
import { Button } from "../../../components/button"
import { routerFactory } from "../../../router"
import { urlSlugs } from "../../../consts"

const router = routerFactory()

export class ErrorPage extends Block<Props> {
  constructor() {
    super({
      props: {
        HomeButton: new Button({
          props: {
            events: {
              click: [() => router.go(urlSlugs.home)]
            },
            text: "Home"
          }
        })
      }
    })
  }

  render(): [string, Props] {
    return [
      /*html*/ `
            <main>
                <h1>
                    Ошибка 404
                </h1>
                <h2>
                    Запрашиваемой страницы не существует
                </h2>
                <h3>
                    Можете вернуться к чатам и попробовать снова
                </h3>
                {{{HomeButton}}}
                <img src="404_img.jpg" alt="Ah shit, here we go again." />
            </main>
        `,
      this.props
    ]
  }
}

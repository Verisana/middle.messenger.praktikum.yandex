import { sum } from "./modules/sum"
import testHBS from "./test.hbs"
import main from "./main"

const root = document.querySelector("#root")
const sumHTML = document.querySelector("#sum")
sumHTML.textContent = `Sum checking ${sum(6, -1).toString()}`

const hbs = root.querySelector("#testHBS")

const params = { firstName: "Handlebars", lastName: "Test" }
hbs.innerHTML = testHBS(params)

document.body.appendChild(main())

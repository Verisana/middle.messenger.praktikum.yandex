import { sum } from "./modules/sum"
import testHBS from "./test.hbs"
import main from "./main"

const root = document.createElement("div")
document.body.appendChild(root)

const p_sum = document.createElement("p")
p_sum.textContent = `Sum checking ${sum(6, -1).toString()}`

root.appendChild(p_sum)

const hbs = document.createElement("div")

const params = { firstName: "Handlebars", lastName: "Test" }
hbs.innerHTML = testHBS(params)

document.body.appendChild(hbs)
document.body.appendChild(main())

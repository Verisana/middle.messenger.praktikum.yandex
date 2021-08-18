import classes from "./main.css"

export default () => {
    const m = document.createElement("h2")
    m.className = classes.main
    m.textContent = "CSS style checking"
    return m
}

import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const PORT = 3000

// Start from src
const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

const app = express()

app.use(express.static(path.join(__dirname, "dist")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Listening port number ${PORT}`)
})

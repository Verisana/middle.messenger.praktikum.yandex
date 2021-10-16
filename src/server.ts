import express from "express"
import path from "path"

const PORT = 3000

// const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

const app = express()

app.use(express.static(path.join(__dirname, "..", "dist")))

app.get("/", (_0, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Listening port number ${PORT}`)
})

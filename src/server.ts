import express from "express"
import * as dotenv from "dotenv"
import path from "path"

dotenv.config()

const PORT =
  process.env.SERVER_PORT !== undefined ? process.env.SERVER_PORT : 3000

// const __dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

const app = express()

app.use(express.static(path.join(__dirname, "..", "dist")))

app.get("/*", (_0, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Listening port number ${PORT}`)
})

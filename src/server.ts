import express from "express"
import path from "path"

const PORT = process.env.PORT !== undefined ? process.env.PORT : 3000

const app = express()

app.use(express.static(path.join(__dirname, "..", "dist")))

app.get("/*", (_0, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"))
})

app.listen(PORT, () => {
  console.log(`Listening port number ${PORT}`)
})

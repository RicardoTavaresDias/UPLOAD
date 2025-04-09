import "express-async-errors"
import express from "express"
import { router } from "./routes/router.js"

export const app = express()

app.use(express.json())

// get dos arquivos da pasta
app.use('/document', express.static("tmp/document"))
app.use('/upload', express.static("tmp/upload"))

app.use(router)
import "express-async-errors"
import express from "express"
import { router } from "./routes/router.js"

export const app = express()

app.use(express.json())

// get dos arquivos da pasta - tmp/document || tmp/upload
app.use('/document', express.static("\\\\192.168.15.166\\servidor_arquivo\\document"))
app.use('/upload', express.static("\\\\192.168.15.166\\servidor_arquivo\\upload"))

app.use(router)
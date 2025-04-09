import "express-async-errors"
import express from "express"
import { router } from "./routes/router.js"
import dotenv from 'dotenv'

dotenv.config()
export const app = express()

app.use(express.json())

// get dos arquivos da pasta - tmp/document || tmp/upload
app.use('/document', express.static(`${process.env.FILE_SERVER_PATH}/document`))
app.use('/upload', express.static(`${process.env.FILE_SERVER_PATH}/upload`))

app.use(router)
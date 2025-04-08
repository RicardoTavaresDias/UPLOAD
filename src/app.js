import "express-async-errors"
import express from "express"
import { router } from "./routes/router.js"

export const app = express()

app.use(express.json())

app.use('/', express.static("tmp/upload"))
app.use(router)



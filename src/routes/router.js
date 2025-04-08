import {  Router } from "express";
import { upload } from "../config/multerConfig.js"; 

import fs from "node:fs"
import path from "node:path";

export const router = Router()

router.post("/upload", upload.single("file"), (request, response) => {
  return response.json({
    message: "Upload realizado com sucesso!",
    file: request.file
  })
})


router.delete('/remove/:id', async (request, response) => {  
  const tmpPath = path.resolve("tmp/upload", request.params.id)
  try {
    await fs.promises.unlink(tmpPath)
    response.json({ message: "Arquivo removido com sucesso!"})
  } catch (error) {
    console.log(error)
    response.json({ message: error.message })
  }
})



import {  Router } from "express";
import { upload } from "../config/multerConfig.js"; 

import fs from "node:fs"
import path from "node:path";
import multer from "multer";

export const router = Router()

router.post("/upload", (request, response) => {
  upload(request, response, (error) => {
    if(error instanceof multer.MulterError){
      return response.status(422).json({ message: error.message })
    }else if (error){
      return response.status(500).json({ message: error.message })
    }

    if(request.errorMessage){
      return response.status(422).json({ message: request.errorMessage })
    }

    return response.status(200).json({
      message: "Upload completed successfully!",
      file: request.file
    })
  })  
})


router.delete('/remove/:id', async (request, response) => {  
  const tmpPath = path.resolve("tmp/upload", request.params.id)
  try {
    await fs.promises.unlink(tmpPath)
    response.status(200).json({ message: "File removed successfully!"})
  } catch (error) {
    console.log(error)
    response.status(422).json({ message: "No such file or directory" })
  }
})



import { Router } from "express";
import { storageImage, storageDocument, fileImage, fileFilterDocument } from "../config/multerConfig.js"; 

import fs from "node:fs"
import path from "node:path";
import multer from "multer";

export const router = Router()

const uploddSingle = multer({ 
  storage: storageImage, 
  fileFilter: fileImage, 
  limits: { fileSize: 2 * 1024 * 1024 }
}).single('file')

// upload unico arquivo imagem
router.post("/upload", (request, response) => {
  uploddSingle(request, response, (error) => {
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

const uploadMult = multer({ 
  storage: storageImage,
  fileFilter: fileImage,
  limits: { fileSize: 2 * 1024 * 1024 }
}).array("files")

// upload mult arquivo imagem
router.post("/uploadmult", (request, response) => {
  uploadMult(request, response, (error) => {
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
      file: request.files
    })
  })  
})

const uploadDocument = multer({
  storage: storageDocument,
  fileFilter: fileFilterDocument,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
}).single("file")

// upload unico arquivo em pdf
router.post("/document", (request, response) => {
  uploadDocument(request, response, (error) => {
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


// Remoção dos arquivos upload como image e pdf
router.delete('/remove/:id', async (request, response) => {  
  const tmpPath = path.resolve(
    request.params.id.includes("pdf") ? "tmp/document" : "tmp/upload", 
    request.params.id
  )
  try {
    await fs.promises.unlink(tmpPath)
    response.status(200).json({ message: "File removed successfully!"})
  } catch (error) {
    console.log(error)
    response.status(422).json({ message: "No such file or directory" })
  }
})
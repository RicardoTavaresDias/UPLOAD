import { response, Router } from "express";
import { storageImage, storageDocument, fileImage, fileFilterDocument } from "../config/multerConfig.js"; 

import fs from "node:fs"
import path from "node:path";
import multer from "multer";
import dotenv from 'dotenv'

dotenv.config()
export const router = Router()

// returno da função para não ser repetitivo
const fileError = (error, request, response) => {
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
    file: request.files ? request.files : request.file
  })
}

// configuração do multer para upload unico arquivo imagem
const uploddSingle = multer({ 
  storage: storageImage, 
  fileFilter: fileImage, 
  limits: { fileSize: 2 * 1024 * 1024 }
}).single('file')

// upload unico arquivo imagem
router.post("/upload", (request, response) => {
  try {
  uploddSingle(request, response, (error) => {
    fileError(error, request, response)
  }) 
} catch (error){
  console.log(error)
} 
})

// configuração do multer para upload mult arquivo imagem
const uploadMult = multer({ 
  storage: storageImage,
  fileFilter: fileImage,
  limits: { fileSize: 2 * 1024 * 1024 }
}).array("files")

// upload mult arquivo imagem
router.post("/uploadmult", (request, response) => {
  uploadMult(request, response, (error) => {
    fileError(error, request, response)
  })  
})

// configuração do multer para upload unico arquivo em pdf
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
    fileError(error, request, response)
  })
})

// Donwload arquivo
router.get("/download/:filename", (request, response) => {
  const directory = request.params.filename.includes("pdf") ? "document" : "upload"
  const downloadPath = path.resolve(`${process.env.FILE_SERVER_PATH}/${directory}/${request.params.filename}`)
  response.download(downloadPath, (error) => {
    if(error){
      console.log("Erro no download:", error)
      return response.status(404).json({ message: "File not found" })
    }
  })
})

// Remoção dos arquivos upload como image e pdf
router.delete('/remove/:id', async (request, response) => {  
  const tmpPath = path.resolve(
    request.params.id.includes("pdf") ? `${process.env.FILE_SERVER_PATH}/document` : `${process.env.FILE_SERVER_PATH}/upload`, 
    request.params.id
  )
  
  try {
    await fs.promises.unlink(tmpPath)
    response.status(200).json({ message: "File removed successfully!"})
  } catch (error) {
    console.log(error, request.params.id)
    response.status(422).json({ message: `No such file or directory => ${request.params.id}` })
  }
})
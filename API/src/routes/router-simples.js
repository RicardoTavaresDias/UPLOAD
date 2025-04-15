import { Router } from "express";
import { upload } from "../config/multerConfig-simples.js"; 

import fs from "node:fs"
import path from "node:path";
import multer from "multer";
import dotenv from 'dotenv'

dotenv.config()
export const routerSimples = Router()

// upload unico arquivo imagem
routerSimples.post("/upload", (request, response) => {
  try {
    upload (request, response, (error) => {
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
  } catch(error){
    console.log(error)
  }
})
  


// Donwload arquivo
routerSimples.get("/download/:filename", (request, response) => {
  const directory = "upload"
  const downloadPath = path.resolve(`${process.env.FILE_SERVER_PATH}/${directory}/${request.params.filename}`)
  response.download(downloadPath, (error) => {
    if(error){
      console.log("Erro no download:", error)
      return response.status(404).json({ message: "File not found" })
    }
  })
})

// Remoção dos arquivos upload como image e pdf
routerSimples.delete('/remove/:id', async (request, response) => {  
  const tmpPath = path.resolve(`${process.env.FILE_SERVER_PATH}/upload`, request.params.id)
  try {
    await fs.promises.unlink(tmpPath)
    response.status(200).json({ message: "File removed successfully!"})
  } catch (error) {
    console.log(error, request.params.id)
    response.status(422).json({ message: `No such file or directory => ${request.params.id}` })
  }
})
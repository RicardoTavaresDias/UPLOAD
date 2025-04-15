import multer from "multer";
import fs from "node:fs"
import dotenv from 'dotenv'

dotenv.config()

// Caminho do arquivo aonde será salvo
// \\\\192.168.15.180\\servidor_arquivo\\ - servidor de arquivo pela rede

export const upload = multer({

  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      try {
        if(!fs.existsSync(process.env.FILE_SERVER_PATH)){
          fs.mkdirSync(process.env.FILE_SERVER_PATH)
          fs.mkdirSync(process.env.FILE_SERVER_PATH + "/" + 'upload')
        }
        callback(null, process.env.FILE_SERVER_PATH + "/" + 'upload')
      } catch(error){
        callback(new Error("File server not found"), null)
      }
    },

    filename: (request, file, callback) => {
      const time = new Date().getTime()
      //callback(null, `${time}_${file.originalname}`.replaceAll(" ", '_'))
      callback(null, file.originalname)
    }
  }),

  fileFilter: (request, file, callback) => {
    const filter = [ "image/png", "image/jpg", "image/jpeg" ]
    if(!filter.includes(file.mimetype)){
      callback(null, true)
    }else {
      request.errorMessage = "Invalid file type .pdf"
      callback(null, false)
    }
  }, 
  
  limits: { fileSize: 100 * 1024 * 1024 }

})
import multer from "multer";
import fs from "node:fs"
import dotenv from 'dotenv'

dotenv.config()

// Caminho do arquivo aonde será salvo
// \\\\192.168.15.180\\servidor_arquivo\\ - servidor de arquivo pela rede

// faz parte do multer -  salvar arquivo nesse caminho upload
const storageImage = multer.diskStorage({
  destination: (request, file, callback) => {
    storage("upload", callback)
  },
  filename: (request, file, callback) => {
    FileName(file, callback)
  }  
})

// faz parte do multer -  salvar arquivo nesse caminho document
const storageDocument = multer.diskStorage({
  destination: (request, file, callback) => {
    storage("document", callback)
  },
  filename: (request, file, callback) => {
    FileName(file, callback)
  }  
})

// returno da função para não ser repetitivo
const storage = (typeFile, callback) => {
  // C:/Users/Ricardo/Desktop/teste || tmp/upload
  //callback(null, path.resolve("tmp/upload"))
  try {
    if(!fs.existsSync(process.env.FILE_SERVER_PATH)){
      fs.mkdirSync(process.env.FILE_SERVER_PATH)
      fs.mkdirSync(process.env.FILE_SERVER_PATH + "/" + typeFile)
    }else if (!fs.existsSync(process.env.FILE_SERVER_PATH + "/" + typeFile)){
      fs.mkdirSync(process.env.FILE_SERVER_PATH + "/" + typeFile)
    }
    callback(null, process.env.FILE_SERVER_PATH + "/" + typeFile)
  } catch(error){
    callback(new Error("File server not found"), null)
  }
}

// returno da função para não ser repetitivo
const FileName = (file, callback) => {
  const time = new Date().getTime()
  callback(null, `${time}_${file.originalname}`.replaceAll(" ", '_'))
}

// filtro tipo de arquivo será carregado - faz parte do multer - imagem
const fileImage = (request, file, callback) => {
  // "application/vnd.openxmlformats-officedocument.wordprocessingml.document" - DOCX e "application/pdf" - PDF
  const filter = [ "image/png", "image/jpg", "image/jpeg" ]
  if (filter.includes(file.mimetype)){
    callback(null, true)
  }else {
    request.errorMessage = "Invalid file type"
    callback(null, false)
  }
}  

// filtro tipo de arquivo será carregado - faz parte do multer - pdf
const fileFilterDocument = (request, file, callback) => {
  const filter = [ "application/pdf" ]
  if(filter.includes(file.mimetype)){
    callback(null, true)
  }else {
    request.errorMessage = "Invalid file type .pdf"
    callback(null, false)
  }
}

// export const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024
//   }
// }).single('file')

export {
  storageImage,
  storageDocument,
  fileImage,
  fileFilterDocument
}
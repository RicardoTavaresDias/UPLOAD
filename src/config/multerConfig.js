import multer from "multer";
import fs from "node:fs"

// Caminho do arquivo aonde será salvo
// \\\\192.168.15.180\\teste\\ - servidor de arquivo pela rede
const PATH = "\\\\192.168.15.166\\servidor_arquivo\\"

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
  if(fs.existsSync(PATH)){
    if(!fs.existsSync(PATH)){
      fs.mkdirSync(PATH)
      fs.mkdirSync(PATH + typeFile)
    }else if (!fs.existsSync(PATH + typeFile)){
      fs.mkdirSync(PATH + typeFile)
    }
    callback(null, PATH + typeFile)
  }else {
    callback(new Error("File server not found"), null)
  }
}

// returno da função para não ser repetitivo
const FileName = (file, callback) => {
  const time = new Date().getTime()
  callback(null, `${time}_${file.originalname}`)
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
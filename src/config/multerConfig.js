import multer from "multer";
import fs from "node:fs"

const storageImage = multer.diskStorage({
  destination: (request, file, callback) => {
    // C:/Users/Ricardo/Desktop/teste || tmp/upload
    //callback(null, path.resolve("tmp/upload"))
    if(!fs.existsSync("tmp")){
      fs.mkdirSync("tmp")
      fs.mkdirSync("tmp/upload")
    }else if (!fs.existsSync("tmp/upload")){
      fs.mkdirSync("tmp/upload")
    }
    callback(null, "tmp/upload")
  },
  filename: (request, file, callback) => {
    const time = new Date().getTime()
    callback(null, `${time}_${file.originalname}`)
  }  
})

const storageDocument = multer.diskStorage({
  destination: (request, file, callback) => {
    // C:/Users/Ricardo/Desktop/teste || tmp/upload
    //callback(null, path.resolve("tmp/upload"))
    if(!fs.existsSync("tmp")){
      fs.mkdirSync("tmp")
      fs.mkdirSync("tmp/document")
    }else if (!fs.existsSync("tmp/document")){
      fs.mkdirSync("tmp/document")
    }
    callback(null, "tmp/document")
  },
  filename: (request, file, callback) => {
    const time = new Date().getTime()
    callback(null, `${time}_${file.originalname}`)
  }  
})

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
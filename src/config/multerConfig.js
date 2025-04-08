import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    // C:/Users/Ricardo/Desktop/teste || tmp/upload
    callback(null, path.resolve("tmp/upload"))
  },
  filename: (request, file, callback) => {
    const time = new Date().getTime()
    callback(null, `${time}_${file.originalname}`)
  }  
})

const fileFilter = (request, file, callback) => {
  // "application/vnd.openxmlformats-officedocument.wordprocessingml.document" - DOCX e "application/pdf" - PDF
  const filter = [ "image/png", "image/jpg", "image/jpeg" ]
  if (filter.includes(file.mimetype)){
    callback(null, true)
  }else {
    callback(new Error("Invalid file type."))
  }
}  

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024
  }
})
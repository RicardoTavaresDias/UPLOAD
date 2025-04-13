import { AxiosError } from "axios";
import { app } from "../server/app.js"
import { useState } from "react";

export function useUpload(){
  const [file, setFile] = useState([])
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(false)

  // Salva upload na api
  async function onSubmit(){
    const formData = new FormData()
    file.forEach(files => {
      formData.append(file.length === 1 ? "file" : "files", files.file)
    });
    try {
      const response = await app.post(
        file.length == 1 ? (file[0].file.name.includes('pdf') ? "/document" : "/upload") : "/uploadmult",
        formData,
        {
          onUploadProgress: (env) => {
              const progressCompleted = Math.round(
                (env.loaded * 100) / env.total
              )
              setProgress(progressCompleted)
          }
        }
      )
          
      setError(false)
      //alert(response.data.message)

    }catch(error){
      console.log(error)

      // Erro tipo de arquivo não permitido e apos remove que foi salvo nesse bloco de erro
      if(error instanceof AxiosError){
        alert(error.response.data.message.message + " " + error.response.data.message.type)
        
       file.forEach(element => {
          app.delete("/remove/" + element.file.name)
        });
        
      }

      setError(true)
      //alert(error.response.data.message)
    }
  }

  // Carrega o card do arquivo no upload
  function addUpload(value){  
    setError(false)
      if(!value){
        return
      }    
  
      if(!setFile.length){
        setFile({
          id: new Date().getTime(),
          file: value
        })
      }else {
        setFile((prev) => [...prev, {
          id: new Date().getTime(),
          file: value
        }])
      }
      setProgress(0)
    }

  // Remove o card do upload
  function handleRemove(remove){
    setFile((prev) => prev.filter((value) => value.id !== remove))
  }

  function closeCarUpload(){
    setFile([])
  }

  return {
    file,
    progress,
    error,
    onSubmit,
    handleRemove,
    addUpload,
    closeCarUpload
  }
}
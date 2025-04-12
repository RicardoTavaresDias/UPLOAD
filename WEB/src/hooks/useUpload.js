import { app } from "../server/app.js"
import { useState } from "react";

export function useUpload(){
  const [file, setFile] = useState([])
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(false)

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
          }})
          
      setError(false)
      console.log(response)
      //alert(response.data.message)
    }catch(error){
      console.log(error)
      setError(true)
      setTimeout(() => {
        setFile([])
      }, 2000);
      //alert(error.response.data.message)
    }
  }

  function handleRemove(remove){
    setFile((prev) => prev.filter((value) => value.id !== remove))
  }

  return {
    file,
    progress,
    error,
    onSubmit,
    handleRemove,
    setFile,
    setProgress,
  }
}
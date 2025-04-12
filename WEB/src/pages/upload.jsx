import { InputUpload } from "../components/input-upload.jsx"
import { UploadLoading } from '../components/upload-loading.jsx';
import { Button } from "../components/button.jsx";
import svg from '../assets/close.svg'

import { useUpload } from "../hooks/useUpload.js";

export function Upload(){
  const { file, progress, error, handleRemove, onSubmit, setFile, setProgress } = useUpload()

  function get(){
    alert('get')
  }

  function addUpload(value){  
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

  return (
    <>
      <InputUpload>
        <input type="file" id="birth-file" name="birth-file" onChange={(e) => addUpload(e.target.files[0])} />
      </InputUpload>

      {file && file.map((value, index) => (
        <UploadLoading key={value.id} fileName={value.file?.name} progresse={progress} border={error} onClick={() => get()}>
          <a href="#" onClick={() => handleRemove(value.id)}>
            <img src={svg} />
          </a>
        </UploadLoading>
      ))
      }
      
      <Button >
        <button className="btn-primary" type="submit" onClick={onSubmit}>
          Upload
        </button>
      </Button>
    </>
  )
}
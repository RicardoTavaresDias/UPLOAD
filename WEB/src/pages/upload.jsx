import { InputUpload } from "../components/input-upload.jsx"
import { UploadLoading } from '../components/upload-loading.jsx';
import { Button } from "../components/button.jsx";

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
  }

  return (
    <>
      <InputUpload>
        <input type="file" id="birth-file" name="birth-file" onChange={(e) => addUpload(e.target.files[0])} />
      </InputUpload>
      {file && file.map((value, index) => (
        <UploadLoading key={value.id} fileName={value.file?.name} progresse={progress} border={error} onClick={() => get()}>
          <a href="#" onClick={() => handleRemove(value.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
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
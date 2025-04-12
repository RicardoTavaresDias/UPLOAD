import { InputUpload } from "../components/input-upload.jsx"
import { UploadLoading } from '../components/upload-loading.jsx';
import { Button } from "../components/button.jsx";

import { useUpload } from "../hooks/useUpload.js";

export function Upload(){
  const { file, progress, error, handleRemove, onSubmit, setFile, setProgress } = useUpload()

  function get(){
    alert('get')
  }

  return (
    <>
      <InputUpload>
        <input type="file" id="birth-file" name="birth-file" onChange={(e) => {setProgress(0); setFile((prev) =>  [...prev, e.target.files[0]])}} />
      </InputUpload>
      {file && file.map((value, index) => (
        <UploadLoading key={index} fileName={value.name} progresse={progress} border={error} onClick={() => get()}>
          <a href="#" onClick={() => handleRemove(index)}>
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
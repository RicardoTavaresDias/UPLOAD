import { InputUpload } from "../components/input-upload.jsx"
import { UploadLoading } from '../components/upload-loading.jsx';
import { Button } from "../components/button.jsx";
import svg from '../assets/close.svg'

import { useUpload } from "../hooks/useUpload.js";

export function Upload(){
  const { 
    file, 
    progress, 
    error, 
    handleRemove, 
    onSubmit, 
    addUpload, 
    closeCarUpload 
  } = useUpload()

  return (
    <>
      <InputUpload>
        <input type="file" id="birth-file" name="birth-file" onChange={(e) => addUpload(e.target.files[0])} />
      </InputUpload>

      {file && file.map((value, index) => (
        <UploadLoading 
          key={value.id} 
          fileName={value.file?.name} 
          progress={progress} 
          border={error} 
          link={progress === 100 ? `http://localhost:3333/download/${value.file?.name}` : '#'} 
        >
          <a className="close" href="#" onClick={() => handleRemove(value.id)}>
            <img src={svg} />
          </a>
        </UploadLoading>
      ))
      }
      
      {file.length > 0 &&
      <>
        <Button >
          <button className="btn-primary" type="submit" onClick={progress === 100 ? closeCarUpload : onSubmit}>
            {progress === 100 ? "Close" : "Upload"}
          </button>
        </Button>
      </>
      }

        
      
    </>
  )
}
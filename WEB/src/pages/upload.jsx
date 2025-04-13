import { InputUpload } from "../components/input-upload.jsx"
import { UploadLoading } from '../components/upload-loading.jsx';
import { Button } from "../components/button.jsx";

import svgClose from '../assets/close.svg'
import svgCheck from '../assets/check.svg'
import svgCloseError from '../assets/closeError.svg'

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
        <input 
          type="file" 
          id="birth-file" 
          name="birth-file" 
          onChange={(e) => addUpload(e.target.files[0])} 
          disabled={progress ? true : false}
        />
      </InputUpload>

      {file && file.map((value, index) => (
        <UploadLoading 
          key={value.id} 
          file={value.file} 
          progress={progress} 
          link={progress === 100 ? `http://localhost:3333/download/${value.file?.name}` : '#'} 
        >
        
          <a 
            className={progress < 1 ? (progress === 100 ? "check" : "close") : 'clean' } 
            href="#" 
            onClick={progress === 100 ? '' : () => handleRemove(value.id)}
          >
            {!(progress > 0 && progress < 100) ?
              <img src={progress === 100 ? (error ? svgCloseError : svgCheck) : svgClose} /> 
              : 
              null
            } 
          </a> 
        
        </UploadLoading>
      ))}
      
      {file.length > 0 &&
        <>
          <Button >
            <button 
              className="btn-primary" 
              type="submit" 
              onClick={progress === 100 ? closeCarUpload : onSubmit}
              disabled={(progress > 0 && progress < 99)}
            >
              {progress === 100 ? "Close" : "Upload"}
            </button>
          </Button>
        </>
      }
    </>
  )
}
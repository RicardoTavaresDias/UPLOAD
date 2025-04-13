import "./upload-loading.css"
import svg from '../assets/file.svg'

export function UploadLoading({ file, progress, children, link }){
  return (
    <div className="containerUploadLoading"  >
      <div className="arquivo" >
        <img src={svg} />
        <a className="link" href={link} target="_parent" >{file?.name}</a>
        {children}
      </div>
        <div className="containerProgress">
          {progress == 100 ? 
            <div className="kb">{(file.size / (1024 * 1024)).toFixed(2)} MB</div> 
            :
            <div className="progress">
              <div style={{width: `${progress}%`}}></div>
            </div>
          }
          <span>{progress === 100 ? "" : `${progress}%`}</span>
        </div>
    </div>
  )
}
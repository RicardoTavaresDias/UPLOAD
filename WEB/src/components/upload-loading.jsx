import "./upload-loading.css"
import svg from '../assets/file.svg'

export function UploadLoading({ fileName, progress, border, children, link }){
  return (
    <div className="containerUploadLoading" id={border ? "error" : ""} >
      <div className="arquivo" >
        <img src={svg} />
        <a className="link" href={link} target="_parent" >{fileName}</a>
        {children}
      </div>
        <div className="containerProgress">
          <div className="progress">
            <div style={{width: `${progress}%`}}></div>
          </div>
            <span>{`${progress}%`}</span>
        </div>
    </div>
  )
}
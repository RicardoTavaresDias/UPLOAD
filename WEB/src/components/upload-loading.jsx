import "./upload-loading.css"
import svg from '../assets/file.svg'

export function UploadLoading({ fileName, progresse, border, children, onClick }){
  return (
    <div className="containerUploadLoading" id={border ? "error" : ""}>
      <div className="arquivo" >
        <img src={svg} />
        <span onClick={onClick} >{fileName}</span>
        {children}
      </div>
        <div className="containerProgress">
          <div className="progress">
            <div style={{width: `${progresse}%`}}></div>
          </div>
            <span>{`${progresse}%`}</span>
        </div>
    </div>
  )
}
import "./upload-loading.css"

export function UploadLoading({ fileName, progresse, border, children, onClick }){
  return (
    <div className="containerUploadLoading" id={border ? "error" : ""}>
      <div className="arquivo" >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="#FEE7D6" stroke="#F3541C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>
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
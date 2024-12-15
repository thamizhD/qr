import React, { useState } from 'react'

const App = () => {
 const [img,setImg] = useState("");
 const [loading,setLoading] = useState(false);
 const [qrData,setQrData] = useState("");
 const [qrSize,setQrSize] = useState("");
 
  async function generateQR(){
    setLoading(true);
    try{
         const url =` https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
         setImg(url);
    }catch(error){
      console.log("Errror generating error",error);

    }finally{
      setLoading(false);
    }
   
  }
  function downloadQR(){
    fetch(img)
    .then((response)=>response.blob())
    .then((blob)=>{
      const link=document.createElement("a");
      link.href=URL.createObjectURL(blob);
      link.download="qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error)=>{
      console.error("error downloading QR code", error)
    })
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>please wait..</p>}
     {img &&  <img src={img} className='qr-code-image' alt="" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for QR code:
          </label>
          <input type='text' value={qrData} id = "dataInput" placeholder='Enter Data For Qr' onChange={(e)=> setQrData(e.target.value)}/>
        <label htmlFor="sizeInput" className="input-label">
       Image size(e.g.,150):
          </label>
          <input type='text' value={qrSize} onChange={(e)=>setQrSize(e.target.value)} id = "sizeInput" placeholder='Enter Image Size'/>
          <button className='generate-button' disabled={loading} onClick={ generateQR}>Generate qr code</button>
          <button className='download-button'onClick={downloadQR}>Download qr code</button>
      </div>
      <p className='footer'>Designed By Tamizh</p>
    </div>
  )
}

export default App
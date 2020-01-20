import download from 'downloadjs'
export const exportExcel=(res)=>{
    
    var dataUrl = 'data:' + res.data.ContentType + ';base64,' + res.data.FileContent;
    download(dataUrl, res.data.FileName, res.data.ContentType);
}
export const importExcel=()=>{
    
}
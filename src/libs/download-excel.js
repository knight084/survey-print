export default params => {
  if (!params.response) throw new Error('missing required params: response object');

  // params
  let {response: {data, headers: {'content-disposition': disposition}}, type, name} = params;
  const executed = /;filename=(.*)(;?)/i.exec(disposition);

  // define default type and value if not provide, default type is '.xls', default name using with date of today
  type = type || 'application/vnd.ms-excel;charset=utf-8'; // excel
  name = name || (executed && executed[1] && decodeURI(executed[1])) || new Date().toLocaleDateString();

  // create blob、url and download-element, below using anchor
  const blob = new Blob([data], {type});
  const url = window.URL.createObjectURL(blob);
  const downLoadElement = document.createElement('a');

  // assign url and name to the download-element
  downLoadElement.href = url;
  downLoadElement.download = name;

  // append download-element to body
  document.body.appendChild(downLoadElement);

  // mock click download-element to download the blob
  downLoadElement.click();

  // remove the download-element from body after trigger download
  document.body.removeChild(downLoadElement);

  // revoke the url-resource
  window.URL.revokeObjectURL(url);

};

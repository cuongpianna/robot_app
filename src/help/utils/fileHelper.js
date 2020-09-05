export function dowloadFile(data) {
    var blob = b64toBlob(data.encodedData, data.contentType)
    if (navigator.msSaveBlob) {
      return navigator.msSaveBlob(blob, data.FileName)
    }
    var url = window.URL.createObjectURL(blob)
    // var a =
    //   '<a id="instDownloadLink" href="' +
    //   url +
    //   '" download="' +
    //   data.fileName +
    //   '" target="_blank"></a>';
    var body = document.getElementsByTagName('body')[0]
    var aTag = document.createElement('a')

    aTag.id = 'instDownloadLink'
    aTag.href = url
    aTag.download = data.fileName
    aTag.target = '_blank'
    insertAfter(aTag, body)

    setTimeout(function() {
    document.getElementById('instDownloadLink').click()
      setTimeout(function() {
        window.URL.revokeObjectURL(url)
        document.getElementById('instDownloadLink').remove()
      }, 100)
    }, 100)
  }
  function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || ''
    sliceSize = sliceSize || 512
    var byteCharacters = window.atob(b64Data)
    var byteArrays = []
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)
        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }
        var byteArray = new Uint8Array(byteNumbers)
        byteArrays.push(byteArray)
    }
    var blob = new Blob(byteArrays, { type: contentType })
    return blob
}
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

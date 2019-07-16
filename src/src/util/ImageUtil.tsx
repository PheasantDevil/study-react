export const dataUriToBlob = (dataUri: string) => {
  const byteString = atob(dataUri.split(',')[1])
  const mimeType = dataUri.match(/(:)([a-z\/]+)(;)/)![2]
  const buffer = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    buffer[i] = byteString.charCodeAt(i) // charCodeAtで配列に
  }
  return new Blob([buffer], {
    type: mimeType
  })
}

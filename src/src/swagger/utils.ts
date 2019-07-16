import camelcaseKeys from 'camelcase-keys'
import { COLLECTION_FORMATS } from './variables'
import { Configuration } from './configuration'
// import sigV4Client from './sigV4Client'
// import { CognitoIdentityCredentials } from 'aws-sdk/global'
import snakeCaseKeys from 'snakecase-keys'

const baseUri = API_GATEWAY_ENDPOINT
// const basePathIndex = baseUri.indexOf('/', 'https://'.length)
// const basePath = baseUri.substring(basePathIndex)
// const endpoint = baseUri.substring(0, basePathIndex)
const configuration = new Configuration()
const buildQueryParameters = (values: Object = {}) => {
  const params = Object.keys(values).reduce((obj, key) => {
    if (Array.isArray(values[key])) {
      if (values[key].length) {
        obj[key] = values[key].join(COLLECTION_FORMATS['csv'])
      }
    } else if (values[key] || values[key] === 0) {
      obj[key] = values[key] + ''
    }
    return obj
  }, {})
  return Object.keys(params).length
    ? new URLSearchParams(snakeCaseKeys(params, { deep: true }))
    : void 0
}

export const callApi = <T>({
  method,
  path,
  accepts,
  contentTypes,
  headerParameters,
  queryParameters,
  plainBody,
  formParams
}: // credentials
{
  method: string
  path: string
  accepts: string[]
  contentTypes: string[]
  headerParameters: Array<{ key: string; value: any }>
  queryParameters: Object
  plainBody?: any
  formParams?: Array<{ key: string; value: any }>
  // credentials?: CognitoIdentityCredentials
}) => {
  const httpHeaderAcceptSelected: string = configuration.selectHeaderAccept(accepts)
  const httpContentTypeSelected: string = configuration.selectHeaderContentType(contentTypes)
  const queryParams = buildQueryParameters(queryParameters)
  const body = plainBody
    ? JSON.stringify(snakeCaseKeys(plainBody, { deep: true }))
    : formParams
    ? formParams.reduce((formParams, { key, value }) => {
        formParams.append(key, value)
        return formParams
      }, new FormData())
    : void 0

  const headers = new Headers()
  if (headerParameters) {
    headerParameters.forEach(({ key, value }) => {
      if (value) {
        headers.set(key, value)
      }
    })
  }
  if (httpHeaderAcceptSelected) {
    headers.set('Accept', httpHeaderAcceptSelected)
  }
  if (httpContentTypeSelected) {
    headers.set('Content-Type', httpContentTypeSelected)
  }

  const { url, ...params } = createCognitoAuthParams({ path, method, headers, body, queryParams })
  return fetch(url, params).then(res =>
    accepts.includes('application/json')
      ? res.json().then(obj => camelcaseKeys(obj, { deep: true }))
      : res.blob() as any
  ) as Promise<T>
}

// const createIamAuthParams = ({
//   credentials,
//   path,
//   method,
//   headers,
//   body,
//   queryParams
// }: {
//   path: string
//   method: string
//   headers: Headers
//   body?: string | FormData
//   queryParams?: URLSearchParams
//   credentials?: CognitoIdentityCredentials
// }) => {
//   const sigClient = sigV4Client.newClient({
//     accessKey: credentials!.accessKeyId,
//     secretKey: credentials!.secretAccessKey,
//     sessionToken: credentials!.sessionToken,
//     region: REGION,
//     endpoint
//   })
//   const signedRequest = sigClient.signRequest({
//     path: `${basePath}${path}`,
//     method,
//     headers,
//     body,
//     queryParams
//   })
//   return { url: signedRequest.url, method, headers: signedRequest.headers, body }
// }

const createCognitoAuthParams = ({
  path,
  method,
  headers,
  body,
  queryParams
}: {
  path: string
  method: string
  headers: Headers
  body?: string | FormData
  queryParams?: URLSearchParams
}) => {
  return {
    url: `${baseUri}${path}${queryParams ? '?' + queryParams['toString']() : ''}`,
    method,
    headers,
    body
  }
}

import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { CognitoIdentityCredentials } from 'aws-sdk/global'
import { DynamoDbTableName as TableName, Region } from '../config/Configuration'

interface AppTable {
  subjectId: string
  subjectKey: string
  userId: number
}

interface CredentialsParam {
  credentials: CognitoIdentityCredentials
}

const createDocumentClient = (credentials: CognitoIdentityCredentials) =>
  new DocumentClient({
    region: Region,
    credentials,
    convertEmptyValues: true
  })

// const createUpdateExpression = (data: Object) => {
//   const UpdateExpression =
//     'set ' +
//     Object.keys(data)
//       .map(key => `${key} = :${key}`)
//       .join(', ')
//   const ExpressionAttributeValues = Object.keys(data).reduce(
//     (payload, key) => ({ ...payload, [`:${key}`]: data[key] }),
//     {}
//   )
//   return { UpdateExpression, ExpressionAttributeValues }
// }

/**
 * Case 1. ユーザ登録
 */
export const postMe = async ({ credentials, userId }: CredentialsParam & { userId: number }) => {
  const client = createDocumentClient(credentials)
  await client
    .put({
      TableName,
      Item: {
        subjectId: credentials.identityId,
        subjectKey: 'me',
        userId
      }
    })
    .promise()
}

/**
 * Case 2. ログイン（自分の情報を取得）
 * Case 13. 生徒が自分の属性を表示
 */
export const fetchMe = async <T extends keyof AppTable>({
  credentials,
  projectionExpressionPaths
}: CredentialsParam & { projectionExpressionPaths: Array<T> }) => {
  const client = createDocumentClient(credentials)
  const result = await client
    .get({
      TableName,
      Key: {
        subjectId: credentials.identityId,
        subjectKey: 'me'
      },
      ProjectionExpression: projectionExpressionPaths.join(',')
    })
    .promise()
  return result.Item as Pick<AppTable, T> | undefined
}

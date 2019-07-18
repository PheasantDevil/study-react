// import S3 from 'aws-sdk/clients/s3'
// import { CognitoIdentityCredentials } from 'aws-sdk/global'
// import { Region, UploadBucketName } from '../config/Configuration'

// interface CredentialsParam {
//   credentials: CognitoIdentityCredentials
// }

// const putObject = async ({
//   credentials,
//   Bucket,
//   Key,
//   Body
// }: CredentialsParam & { Bucket: string; Key: string; Body: Blob }) => {
//   const client = new S3({
//     region: Region,
//     credentials
//   })
//   await client
//     .putObject({
//       Bucket,
//       Key,
//       Body
//     })
//     .promise()
//   return 'OK'
// }

// const deleteObject = async ({
//   Bucket,
//   Key,
//   credentials
// }: CredentialsParam & { Bucket: string; Key: string }) => {
//   const client = new S3({
//     region: Region,
//     credentials
//   })
//   await client.deleteObject({ Bucket, Key }).promise()
//   return 'OK'
// }

// export const putAvatar = ({ credentials, file }: CredentialsParam & { file: Blob }) =>
//   putObject({
//     credentials,
//     Bucket: UploadBucketName,
//     Key: `${credentials.identityId}/avatars/${Date.now()}.png`,
//     Body: file
//   })

// export const deleteAvatar = ({ credentials, userId }: CredentialsParam & { userId: number }) =>
//   deleteObject({ credentials, Bucket: UploadBucketName, Key: `avatars/${userId}.png` })

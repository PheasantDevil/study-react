import { string as yupString } from 'yup'

export const yupUserName = () =>
  yupString()
    .required('メールアドレスを入力してください')
    .email('メールアドレスの形式を満たしておりません')
export const yupPassword = () =>
  yupString()
    .required('パスワードを入力してください')
    .min(8, 'パスワードは8文字以上入力してください')
export const yupCode = () => yupString().required('確認コードを入力してください。')

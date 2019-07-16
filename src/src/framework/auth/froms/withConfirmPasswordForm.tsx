import { withFormik } from 'formik'
import { object as yupObject } from 'yup'
import { ConfirmError } from '../AuthErrors'
import { ConfirmPasswordRouteProps, ConfirmPasswordValues } from '../AuthTypes'
import { yupCode, yupPassword } from './AuthYup'

const withConfirmPasswordForm = withFormik<ConfirmPasswordRouteProps<any>, ConfirmPasswordValues>({
  mapPropsToValues() {
    return {
      newPassword: '',
      code: ''
    }
  },
  validationSchema: yupObject<ConfirmPasswordValues>({
    newPassword: yupPassword(),
    code: yupCode()
  }),
  async handleSubmit(
    { newPassword, code },
    {
      props: {
        authenticator,
        history,
        location,
        authUrls: { urlSignIn },
        userName
      },
      setSubmitting,
      setStatus
    }
  ) {
    try {
      await authenticator.confirmPassword(userName, newPassword, code)
    } catch (e) {
      setSubmitting(false)
      if (ConfirmError.isCodeMismatchException(e)) {
        setStatus('確認コードが違います。')
      }
      if (ConfirmError.isExpiredCodeException(e)) {
        setStatus('確認コードの有効期限が切れています。確認コードを再送信してください。')
      }
      throw e
    }
    window.alert('パスワードの変更に成功しました。新しいパスワードでログインしてください。')
    history.push(urlSignIn, {
      ...location.state,
      userName
    })
  }
})

export default withConfirmPasswordForm

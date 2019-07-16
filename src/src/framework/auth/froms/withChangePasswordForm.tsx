import { FormikErrors, withFormik } from 'formik'
import { object as yupObject } from 'yup'
import { ChangePasswordError } from '../AuthErrors'
import { ChangePasswordRouteProps, ChangePasswordValues } from '../AuthTypes'
import { yupPassword } from './AuthYup'

const withChangePasswordForm = withFormik<ChangePasswordRouteProps<any>, ChangePasswordValues>({
  mapPropsToValues() {
    return {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    }
  },
  validationSchema: yupObject<ChangePasswordValues>({
    currentPassword: yupPassword(),
    newPassword: yupPassword(),
    newPasswordConfirm: yupPassword()
  }),
  validate({ newPassword, newPasswordConfirm }) {
    const errors: FormikErrors<ChangePasswordValues> = {}
    if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
      errors.newPasswordConfirm = '新しいパスワードが一致しません'
    }
    return errors
  },
  async handleSubmit(
    { currentPassword, newPassword },
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
      await authenticator.changePassword(userName, currentPassword, newPassword)
    } catch (e) {
      setSubmitting(false)
      if (ChangePasswordError.isNotAuthorizedException(e)) {
        return setStatus('現在のパスワードが誤っています。')
      }
      if (ChangePasswordError.isLimitExceededException(e)) {
        return setStatus('変更制限がかかっております。しばらく時間をおいてから再度お試しください。')
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

export default withChangePasswordForm

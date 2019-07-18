import { withFormik } from 'formik'
import { object as yupObject } from 'yup'
import { ForgotPasswordError } from '../AuthErrors'
import { ForgotPasswordRouteProps, ForgotPasswordValues } from '../AuthTypes'
import { yupUserName } from './AuthYup'

const withForgotPasswordForm = withFormik<ForgotPasswordRouteProps<any>, ForgotPasswordValues>({
  mapPropsToValues({ location: { state } }) {
    return {
      userName: (state && state.userName) || ''
    }
  },
  validationSchema: yupObject<ForgotPasswordValues>({
    userName: yupUserName()
  }),
  async handleSubmit(
    { userName },
    {
      props: {
        authenticator,
        location,
        history,
        authUrls: { urlConfirmPassword }
      },
      setSubmitting,
      setStatus
    }
  ) {
    try {
      await authenticator.forgotPassword(userName)
    } catch (e) {
      setSubmitting(false)
      if (ForgotPasswordError.isUserNotFoundException(e)) {
        return setStatus('そのユーザ名は存在しません。')
      }
      throw e
    }
    history.push(urlConfirmPassword, { ...location.state, userName })
  }
})

export default withForgotPasswordForm

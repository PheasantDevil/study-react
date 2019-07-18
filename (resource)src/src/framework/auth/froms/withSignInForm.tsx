import { FormikErrors, withFormik } from 'formik'
import { boolean as yupBoolean, object as yupObject, string as yupString } from 'yup'
import { SignInResult } from '../Authenticator'
import { SignInError } from '../AuthErrors'
import { SignInRouteProps, SignInValues } from '../AuthTypes'
import { yupPassword, yupUserName } from './AuthYup'

const withSignInForm = withFormik<SignInRouteProps<any>, SignInValues>({
  mapPropsToValues({ location: { state } }) {
    return {
      userName: (state && state.userName) || '',
      password: '',
      newPassword: '',
      newPasswordRequired: false
    }
  },
  validationSchema: yupObject<SignInValues>({
    userName: yupUserName(),
    password: yupPassword(),
    newPassword: yupString(),
    newPasswordRequired: yupBoolean()
  }),
  validate(values, { authUrls, location }) {
    const errors: FormikErrors<SignInValues> = {}
    if (values.newPasswordRequired) {
      if (!values.newPassword) {
        errors.newPassword = '新しいパスワードを入力してください'
      } else if (values.newPassword.length < 8) {
        errors.newPassword = '新しいパスワードは8文字以上入力してください'
      } else if (values.password === values.newPassword) {
        errors.newPassword = '新しいパスワードは現在のパスワードと同じにできません'
      }
    }
    return errors
  },
  async handleSubmit(
    { userName, password, newPassword, newPasswordRequired },
    {
      props: {
        authUrls: { urlSignInDefaultRedirect },
        authenticator,
        authorizer,
        setUser,
        createUser,
        location,
        history
      },
      setFieldValue,
      setSubmitting,
      setStatus
    }
  ) {
    let result: SignInResult
    try {
      result = await authenticator.signIn(
        userName.trim(),
        password,
        newPasswordRequired ? newPassword : ''
      )
    } catch (e) {
      setSubmitting(false)
      if (SignInError.isNotAuthorizedException(e) || SignInError.isUserNotFoundException(e)) {
        return setStatus('ログインID、またはパスワードが誤っています。')
      }
      // if (SignInError.isUserNotConfirmedException(e)) {
      //   return history.push(urlConfirm, { ...location.state, userName })
      // }
      throw e
    }

    if (result.type === 'signInNewPasswordRequired') {
      setFieldValue('newPasswordRequired', true)
      setSubmitting(false)
      return
    }

    authorizer.useAuthCredentials(result.session.getIdToken().getJwtToken(), userName)
    const credentials = await authorizer.getCredentials()
    const user = await createUser(credentials, result)
    setUser(user)
    history.push((location.state && location.state.from) || urlSignInDefaultRedirect)
  }
})

export default withSignInForm

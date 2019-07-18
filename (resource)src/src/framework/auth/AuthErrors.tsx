export const GetCurrentUserError = {
  isNetworkingError: createErrorCodeChecker('NetworkError', 'NetworkingError'),
  isUserNotFoundException: createErrorCodeChecker('UserNotFoundException'),
  isNotAuthorizedException: createErrorCodeChecker('NotAuthorizedException')
}

// https://docs.aws.amazon.com/ja_jp/cognito-user-identity-pools/latest/APIReference/API_SignUp.html
export const SignUpError = {
  isUsernameExistsException: createErrorCodeChecker('UsernameExistsException'),
  isInvalidPasswordException: createErrorCodeChecker('InvalidPasswordException')
}

// https://docs.aws.amazon.com/ja_jp/cognito-user-identity-pools/latest/APIReference/API_ConfirmSignUp.html
export const ConfirmError = {
  isCodeMismatchException: createErrorCodeChecker('CodeMismatchException'),
  isExpiredCodeException: createErrorCodeChecker('ExpiredCodeException')
}

// https://docs.aws.amazon.com/ja_jp/cognito-user-identity-pools/latest/APIReference/API_ResendConfirmationCode.html
export const ResendError = {
  isCodeDeliveryFailureException: createErrorCodeChecker('CodeDeliveryFailureException')
}

export const SignInError = {
  isNotAuthorizedException: createErrorCodeChecker('NotAuthorizedException'),
  isUserNotFoundException: createErrorCodeChecker('UserNotFoundException'),
  isUserNotConfirmedException: createErrorCodeChecker('UserNotConfirmedException')
}

export const ChangePasswordError = {
  isNotAuthorizedException: createErrorCodeChecker('NotAuthorizedException'),
  isLimitExceededException: createErrorCodeChecker('LimitExceededException')
}

// https://docs.aws.amazon.com/ja_jp/cognito-user-identity-pools/latest/APIReference/API_ForgotPassword.html
export const ForgotPasswordError = {
  isUserNotFoundException: createErrorCodeChecker('UserNotFoundException')
}

function createErrorCodeChecker(...errCodes: string[]) {
  return (err: any) => err && errCodes.includes(err.code)
}

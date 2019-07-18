import { IdentityPoolId, Region, UserPoolClientId, UserPoolId } from '../config/Configuration'
import { initializeAuthContext } from '../framework/auth/AuthContext'
import LoadingPlaceholder from '../components/LoadingPlaceholder'
import User from './User'

export default initializeAuthContext(
  { UserPoolClientId, IdentityPoolId, Region, UserPoolId },
  User.factory,
  LoadingPlaceholder
)

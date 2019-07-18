import { CognitoIdentityCredentials } from 'aws-sdk/global'
import { bind } from 'decko'
import * as React from 'react'
import Authenticator, { SignInSuccess } from './Authenticator'
import Authorizer from './Authorizer'
import { AuthContext } from './AuthTypes'
import CognitoConfig from './CognitoConfig'

export const initializeAuthContext = <User extends {}>(
  cognitoConfig: CognitoConfig,
  createUser: (credentials: CognitoIdentityCredentials, result: SignInSuccess) => Promise<User>,
  Loading: React.ComponentType
) => {
  const authenticator = new Authenticator(cognitoConfig)
  const authorizer = new Authorizer(cognitoConfig)

  const { Provider, Consumer } = React.createContext<AuthContext<User>>({
    authenticator,
    authorizer,
    user: null,
    setUser: () => void 0,
    createUser
  })

  const withAuthProvider = <P extends {}>(Component: React.ComponentType<P>) => {
    class WithAuthProvider extends React.Component<P, { user: User | null; loaded: boolean }> {
      constructor(props: P) {
        super(props)
        this.state = { user: null, loaded: false }
      }

      /**
       * ローカルストレージから現在のユーザを取得し、認証・認可の初期化処理
       */
      async componentDidMount() {
        const result = await authenticator.loadCachedSession()
        if (result && result.session.isValid()) {
          authorizer.useAuthCredentials(result.session.getIdToken().getJwtToken(), result.userName)
          const credentials = await authorizer.getCredentials()
          const user = await createUser(credentials, result)
          this.setState({ user, loaded: true })
        } else {
          authorizer.useUnAuthCredentials()
          this.setState({ user: null, loaded: true })
        }
      }

      @bind
      setUser(user: User | null) {
        this.setState({ user })
      }

      render() {
        if (this.state.loaded) {
          return (
            <Provider
              value={{
                authenticator,
                authorizer,
                user: this.state.user,
                setUser: this.setUser,
                createUser
              }}
            >
              <Component {...this.props} />
            </Provider>
          )
        }
        return <Loading />
      }
    }
    return WithAuthProvider
  }

  const withAuthConsumer = <P extends {}>(
    Component: React.ComponentType<P & AuthContext<User>>
  ) => (props: P) => <Consumer>{value => <Component {...props} {...value} />}</Consumer>

  return {
    withAuthProvider,
    withAuthConsumer
  }
}

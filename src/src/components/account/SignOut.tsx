import * as React from 'react'
import { SignOutRouteProps } from '../../framework/auth/AuthTypes'
import User from '../../models/User'
import { Link } from 'react-router-dom'

const SignOut = ({ signOut }: SignOutRouteProps<User>) => {
  React.useEffect(signOut)
  return (
    <>
      <header>
        <div className="headerAnswer headerAnswer-login">
          <h1 className="headerAnswer__logo">
            <img src="/img/responsive/logo.svg" alt="willbie" />
          </h1>
          <div className="headerAnswer__slogan">ログアウトしました</div>
          <div className="l_switch" style={{ marginTop: 14 }}>
            <Link to={'/account/signin'}>ログインへ</Link>
          </div>
        </div>
      </header>

      <footer>
        <div className="footerLoin">
          <div className="footerLoin__block">
            <div className="footerLoin__list">
              <div className="footerLoin__list_item">
                <a className="footerLoin__list_link" href="">
                  利用規約
                </a>
                /
              </div>
              <div className="footerLoin__list_item">
                <a className="footerLoin__list_link" href="">
                  プライバシーポリシー
                </a>
                <span className="u_spNone">/</span>
              </div>
              <br className="u_pcNone" />
              <div className="footerLoin__list_item">
                <a className="footerLoin__list_link" href="">
                  特定商取引に基づく表示
                </a>
                /
              </div>
              <div className="footerLoin__list_item">
                <a className="footerLoin__list_link" href="">
                  お問い合わせ
                </a>
              </div>
            </div>
            <p className="footerLoin__copy">Copyright &copy; MICROWAVE Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default SignOut

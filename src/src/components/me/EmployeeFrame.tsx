import * as React from 'react'
import { Link } from 'react-router-dom'
import { debounce } from 'lodash'
import {
  corporate,
  me,
  meCheckupsRedirect,
  meProfile,
  meStresschecks,
  urlsAccount,
  faqs
} from '../../config/Url'
import { AuthContext } from '../../framework/auth/AuthTypes'
import User from '../../models/User'
import Footer from '../Footer'

const EmployeeFrame: React.FunctionComponent<AuthContext<User>> = ({ user, children }) => {
  const [mobile, setMobile] = React.useState(document.body.offsetWidth < 768) // 768px未満はモバイル表示
  const setCurrentSize = React.useCallback(
    debounce(() => setMobile(document.body.offsetWidth < 768), 100),
    [setMobile]
  )
  React.useEffect(() => {
    window.addEventListener('resize', setCurrentSize)
    return () => window.removeEventListener('resize', setCurrentSize)
  }, [setCurrentSize])

  const [show, setShow] = React.useState(false)
  const toggle = React.useCallback(() => {
    if (mobile) {
      if (show) {
        // Open -> Close
        document.body.classList.contains('drawerOpen') &&
          document.body.classList.remove('drawerOpen')
      } else {
        // Close -> Open
        !document.body.classList.contains('drawerOpen') && document.body.classList.add('drawerOpen')
      }
    }
    setShow(!show)
  }, [mobile, show, setShow])
  const close = React.useCallback(() => {
    document.body.classList.contains('drawerOpen') && document.body.classList.remove('drawerOpen')
    setShow(false)
  }, [setShow])
  const className = mobile && show ? 'drower__item fadeInLeft' : 'drower__item'
  return (
    <>
      <header>
        <div className="header header-left">
          <h1 className="header__logo">
            <Link className="header__logo_link" to={me}>
              <img src="/img/responsive/logo.svg" alt="willbie" />
            </Link>
          </h1>
          <div className="hamburger" onClick={toggle}>
            <div className="hamburger__pipe" />
            <div className="hamburger__pipe" />
            <div className="hamburger__pipe" />
          </div>
          {/* /.hamburger */}
          <nav>
            <div className="drower">
              <div className="drower__block">
                <div className={className}>
                  <div className="drower__item_img">
                    <img src={user!.avatar} />
                  </div>
                  <div className="drower__link drower__link-inline">{user!.getFullName()}</div>
                </div>
                <div className={className}>
                  <Link className="drower__link" to={me} onClick={close}>
                    <div className="drower__icon drower__icon-record" />
                    マイカルテ
                  </Link>
                </div>
                <div className={className}>
                  <Link className="drower__link" to={meCheckupsRedirect} onClick={close}>
                    <div className="drower__icon drower__icon-diagnosis" />
                    健康診断
                  </Link>
                </div>
                <div className={className}>
                  <Link className="drower__link" to={meStresschecks} onClick={close}>
                    <div className="drower__icon drower__icon-stress" />
                    ストレスチェック
                  </Link>
                </div>
                <div className="drower__item">
                  <a className="drower__link">ヘルプと設定</a>
                </div>
                <div className={className}>
                  <Link className="drower__link" to={meProfile} onClick={close}>
                    アカウント設定
                  </Link>
                </div>
                <div className={className}>
                  <Link className="drower__link" to={faqs} onClick={close}>
                    ヘルプ
                  </Link>
                </div>
                <div className={className}>
                  <Link className="drower__link" to={urlsAccount.urlChangePassword} onClick={close}>
                    パスワード変更
                  </Link>
                </div>
                <div className={className}>
                  <Link className="drower__link" to={urlsAccount.urlSignOut} onClick={close}>
                    ログアウト
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          {mobile && show ? <div className="overlay" onClick={close} /> : null}
        </div>
        <div className="bar is-bar">
          <a className="bar_img" />
          <div className="bar__member" onClick={toggle}>
            <div className="bar__member_img">
              <img src={user!.avatar} />
            </div>
            <div className="bar__member_name is-bar__member_name">{user!.getFullName()}</div>
          </div>
          <div className="bar__nav" style={!mobile && show ? { display: 'block' } : void 0}>
            {user!.isManager || user!.isStresscheckOperator ? (
              <>
                <div className="bar__nav_text">
                  企業向け
                  <br />
                  アカウントに切り替え
                </div>
                <div className="bar__nav_grid">
                  <Link className="bar__nav_switch" to={corporate} onClick={close}>
                    切り替え
                  </Link>
                </div>
              </>
            ) : null}
            <div className="bar__nav_list">
              <div className="bar__nav_item">
                <Link className="bar__nav_link" to={meProfile} onClick={close}>
                  アカウント設定
                </Link>
              </div>
              <div className="bar__nav_item">
                <Link className="bar__nav_link" to={faqs} onClick={close}>
                  ヘルプ
                </Link>
              </div>
              <div className="bar__nav_item">
                <Link className="bar__nav_link" to={urlsAccount.urlChangePassword} onClick={close}>
                  パスワード変更
                </Link>
              </div>
              <div className="bar__nav_item">
                <Link className="bar__nav_link" to={urlsAccount.urlSignOut} onClick={close}>
                  ログアウト
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="l_fixed">
        <section>
          <div className="l_layout">{children}</div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default EmployeeFrame

import * as React from 'react'
import { Link } from 'react-router-dom'
import { meProfile, me, faqs, urlsAccount } from '../../config/Url'
import { AuthContext } from '../../framework/auth/AuthTypes'
import User from '../../models/User'
import Footer from '../Footer'
import CorporateSideBar from './CorporateSideBar'

const CorporateFrame: React.FunctionComponent<AuthContext<User>> = ({ user, children }) => {
  const [show, setShow] = React.useState(false)
  const toggle = React.useCallback(() => setShow(!show), [show, setShow])
  const close = React.useCallback(() => setShow(false), [setShow])
  return (
    <>
      <header>
        <CorporateSideBar />
      </header>
      <section>
        <div className="fixedBar">
          <div className="fixedBar__list">
            <div className="fixedBar__list_item">
              <a href="#">
                <img src="/img/index/fixedBar_pict1.svg" alt="" />
              </a>
            </div>
          </div>
          <div className="fixedBar__member" onClick={toggle}>
            <div className="fixedBar__member_img">
              <img src={user!.avatar} alt="avatar" />
            </div>
            <div className="fixedBar__member_name">{user!.getFullName()}</div>
          </div>
          <div className="fixedBar__nav" style={show ? { display: 'block' } : void 0}>
            <div className="fixedBar__nav_text">
              従業員向け
              <br />
              アカウントに切り替え
            </div>
            <div className="fixedBar__nav_grid">
              <Link className="fixedBar__nav_switch" to={me} onClick={close}>
                切り替え
              </Link>
            </div>
            <div className="fixedBar__nav_list">
              <div className="fixedBar__nav_item">
                <Link className="fixedBar__nav_link" to={meProfile} onClick={close}>
                  アカウント設定
                </Link>
              </div>
              <div className="fixedBar__nav_item">
                <Link className="fixedBar__nav_link" to={faqs} onClick={close}>
                  ヘルプ
                </Link>
              </div>
              <div className="fixedBar__nav_item">
                <Link
                  className="fixedBar__nav_link"
                  to={urlsAccount.urlChangePassword}
                  onClick={close}
                >
                  パスワード変更
                </Link>
              </div>
              <div className="fixedBar__nav_item">
                <Link className="fixedBar__nav_link" to={urlsAccount.urlSignOut} onClick={close}>
                  ログアウト
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="l_layout">{children}</div>
      </section>
      <Footer />
    </>
  )
}

export default CorporateFrame

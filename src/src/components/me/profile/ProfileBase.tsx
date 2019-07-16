import * as React from 'react'

const ProfileBase: React.FunctionComponent = ({ children }) => (
  <>
    <div className="head">
      <h1 className="head__title">アカウント設定</h1>
    </div>
    <div className="l_grid l_grid-border">
      <p className="u_text">
        あなたのアバターを設定できます。
        <br />
        お名前やメールアドレスに変更がある場合は、貴社の管理者にご連絡ください。
      </p>
      <div className="headLine">
        <h2 className="headLine__title">アカウント情報</h2>
      </div>
      {children}
    </div>
  </>
)

export default ProfileBase

import * as React from 'react'
import User from '../../../models/User'

interface Props {
  user: User
  imgSrc: string
  onChangeFile: React.ChangeEventHandler<HTMLInputElement>
  submit: (e: React.FormEvent) => Promise<void>
  cancel: () => void
}

const ProfileEdit: React.FunctionComponent<Props> = ({
  user,
  onChangeFile,
  imgSrc,
  submit,
  cancel
}) => (
  <form onSubmit={submit}>
    <div className="form">
      <div className="form__row">
        <div className="form__col">
          <div className="form__col_title">ログインID</div>
          <div className="form__col_input">
            <input
              className="u_flat u_w320"
              type="text"
              placeholder="testmicro@yahoo.co.jp"
              value={user.username}
              disabled
            />
          </div>
        </div>
      </div>
      <div className="form__row">
        <div className="form__col">
          <div className="form__men">
            <div className="form__men_text">写真</div>
            {/* TODO: 最新のSCSSをもらったあとで、SCSSに退避させる */}
            <div
              className="form__men_img"
              style={{
                backgroundImage: 'url(/img/responsive/avatar_default.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                borderRadius: '50%',
                overflow: 'hidden',
                width: 200,
                height: 200
              }}
            >
              <img src={imgSrc} />
            </div>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-button"
              type="file"
              onChange={onChangeFile}
            />
            <label htmlFor="upload-button">
              <a className="form__men_switch">写真を変更する</a>
            </label>
          </div>
        </div>
      </div>
      <div className="form__row form__row-flex">
        <div className="form__col form__col-w320">
          <div className="form__col_title">氏名(姓）</div>
          <div className="form__col_input">
            <input
              className="u_flat"
              type="text"
              placeholder="大野"
              value={user.familyName}
              disabled
            />
          </div>
        </div>
        <div className="form__col form__col-w320">
          <div className="form__col_title">氏名(名）</div>
          <div className="form__col_input">
            <input
              className="u_flat"
              type="text"
              placeholder="拓郎"
              value={user.givenName}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
    <div className="l_switch">
      <div className="l_switch__w2">
        <button className="u_switch u_switch-blue" type="submit">
          保存
        </button>
      </div>
      <div className="l_switch__w2">
        <button className="u_switch u_switch-white" type="button" onClick={cancel}>
          キャンセル
        </button>
      </div>
    </div>
  </form>
)

export default ProfileEdit

import { Field, Form } from 'formik'
import * as React from 'react'
import { SignInFormProps } from '../../framework/auth/AuthTypes'
import withSignInForm from '../../framework/auth/froms/withSignInForm'
import User from '../../models/User'
import { Link } from 'react-router-dom'
import BlockUI from '../BlockUI'

const SignInForm = ({
  authUrls,
  isSubmitting,
  status,
  values: { newPasswordRequired }
}: SignInFormProps<User>) => (
  <>
    <header>
      <div className="headerAnswer headerAnswer-login">
        <h1 className="headerAnswer__logo">
          <img src="/img/responsive/logo.svg" alt="willbie" />
        </h1>
        <div className="headerAnswer__slogan">さあ「willbie」をはじめよう！</div>
      </div>
    </header>
    {isSubmitting ? <BlockUI /> : null}
    <section>
      <div className="l_answerInput">
        <div className="l_grid l_grid-login">
          <Form>
            <div className="form form-mb0">
              {newPasswordRequired ? (
                <>
                  <h2 className="form__title">パスワード初期化</h2>
                  <div className="form__row">
                    <div className="form__col">
                      <div className="form__col_title">新しいパスワードを設定してください</div>
                      <div className="form__col_input form__col_input-mb">
                        <Field
                          className="u_flat"
                          disabled={isSubmitting}
                          required
                          name="newPassword"
                          autoComplete="new-password"
                          type="password"
                        />
                      </div>
                      <p className="form__col_caption">大文字・小文字・数字・記号を含む8文字以上</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="form__title">ログイン</h2>
                  <div className="form__row">
                    <div className="form__col form__col-login">
                      <div className="form__col_title">メールアドレス</div>
                      <div className="form__col_input">
                        <Field
                          className="u_flat"
                          disabled={isSubmitting || newPasswordRequired}
                          required
                          name="userName"
                          autoComplete="userName"
                          placeholder="tanaka@example.com"
                          type="email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form__row">
                    <div className="form__col">
                      <div className="form__col_title">パスワード</div>
                      <div
                        className={
                          newPasswordRequired
                            ? 'form__col_input'
                            : 'form__col_input form__col_input-mb'
                        }
                      >
                        <Field
                          className="u_flat"
                          disabled={isSubmitting || newPasswordRequired}
                          required
                          name="password"
                          autoComplete="current-password"
                          placeholder="パスワードを入力してください"
                          type="password"
                        />
                      </div>
                      <Link className="form__col_link" to={authUrls.urlForgotPassword}>
                        パスワードを忘れた場合
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {status ? <div>{status}</div> : null}
              <div className="l_switch">
                <div className="l_switch__w100">
                  <button className="u_switch u_switch-blue" type="submit">
                    {newPasswordRequired ? 'はじめる' : 'ログイン'}
                  </button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </section>
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

export default withSignInForm(SignInForm)

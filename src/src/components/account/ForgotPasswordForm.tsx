import { Field, Form } from 'formik'
import * as React from 'react'
import { ForgotPasswordFormProps } from '../../framework/auth/AuthTypes'
import withForgotPasswordForm from '../../framework/auth/froms/withForgotPasswordForm'
import BlockUI from '../BlockUI'
import User from '../../models/User'
import { Link } from 'react-router-dom'

const ForgotPasswordForm = ({ isSubmitting, status, authUrls }: ForgotPasswordFormProps<User>) => (
  <>
    <header>
      <div className="headerAnswer headerAnswer-login">
        <h1 className="headerAnswer__logo">
          <img src="/img/responsive/logo.svg" alt="willbie" />
        </h1>
        <div className="headerAnswer__slogan">パスワードを忘れた場合</div>
      </div>
    </header>
    {isSubmitting ? <BlockUI /> : null}
    <section>
      <div className="l_answerInput">
        <div className="l_grid l_grid-login">
          <Form>
            <div className="form form-mb0">
              <div className="form__row">
                <div className="form__col">
                  <div className="form__col_title">
                    ご登録のメールアドレスを入力し、送信ボタンをクリックしてください。パスワード再設定手順をご案内します。
                  </div>
                  <div className="form__col_input form__col_input-mb">
                    <Field
                      className="u_flat"
                      disabled={isSubmitting}
                      required
                      name="userName"
                      autoComplete="userName"
                      placeholder="tanaka@example.com"
                      type="email"
                    />
                  </div>
                </div>
              </div>
              {status ? <div>{status}</div> : null}
              <div className="l_switch">
                <div className="l_switch__w100">
                  <button className="u_switch u_switch-blue" disabled={isSubmitting}>
                    送信
                  </button>
                </div>
              </div>
              <Link className="form__col_link" to={authUrls.urlSignIn}>
                ログインへ戻る
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </section>
  </>
)

export default withForgotPasswordForm(ForgotPasswordForm)

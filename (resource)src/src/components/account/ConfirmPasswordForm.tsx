import { Field, Form } from 'formik'
import * as React from 'react'
import { ConfirmPasswordFormProps } from '../../framework/auth/AuthTypes'
import withConfirmPasswordForm from '../../framework/auth/froms/withConfirmPasswordForm'
import BlockUI from '../BlockUI'
import User from '../../models/User'

const ConfirmPasswordForm = ({ isSubmitting }: ConfirmPasswordFormProps<User>) => (
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
              <h2 className="form__title">パスワードリセット</h2>
              <div className="form__row">
                <div className="form__col">
                  <div className="form__col_title">
                    ご登録のメールアドレスに確認コードを送付しました。確認コードを入力してパスワードをリセットしてください。
                  </div>
                  <div className="form__col_input form__col_input-mb">
                    <Field
                      className="u_flat"
                      autoComplete="code"
                      disabled={isSubmitting}
                      placeholder="確認コード"
                      name="code"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form__row">
                <div className="form__col">
                  <div className="form__col_title">新しいパスワード</div>
                  <div className="form__col_input form__col_input-mb">
                    <Field
                      className="u_flat"
                      disabled={isSubmitting}
                      required
                      name="newPassword"
                      autoComplete="new-password"
                      placeholder="新しいパスワード"
                      type="password"
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
            </div>
          </Form>
        </div>
      </div>
    </section>
  </>
)

export default withConfirmPasswordForm(ConfirmPasswordForm)

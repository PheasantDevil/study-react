import { Field, Form } from 'formik'
import * as React from 'react'
import { ChangePasswordFormProps } from '../../framework/auth/AuthTypes'
import User from '../../models/User'
import BlockUI from '../BlockUI'
import withChangePasswordForm from '../../framework/auth/froms/withChangePasswordForm'

const ChangePasswordForm = ({ isSubmitting, status }: ChangePasswordFormProps<User>) => (
  <>
    <header>
      <div className="headerAnswer headerAnswer-login">
        <h1 className="headerAnswer__logo">
          <img src="/img/responsive/logo.svg" alt="willbie" />
        </h1>
        <div className="headerAnswer__slogan">パスワード設定</div>
      </div>
    </header>
    {isSubmitting ? <BlockUI /> : null}
    <section>
      <div className="l_answerInput">
        <div className="l_grid l_grid-login">
          <Form>
            <div className="form form-mb0">
              <h2 className="form__title">パスワードを変更します</h2>
              <div className="form__row">
                <div className="form__col">
                  <div className="form__col_title">現在のパスワード</div>
                  <div className="form__col_input form__col_input-mb">
                    <Field
                      className="u_flat"
                      disabled={isSubmitting}
                      required
                      name="currentPassword"
                      type="password"
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
                      type="password"
                    />
                  </div>
                  <p className="form__col_caption">大文字・小文字・数字・記号を含む8文字以上</p>
                </div>
              </div>
              <div className="form__row">
                <div className="form__col">
                  <div className="form__col_title">新しいパスワード（確認）</div>
                  <div className="form__col_input form__col_input-mb">
                    <Field
                      className="u_flat"
                      disabled={isSubmitting}
                      required
                      name="newPasswordConfirm"
                      type="password"
                    />
                  </div>
                </div>
              </div>
              {status ? <div>{status}</div> : null}
              <div className="l_switch">
                <div className="l_switch__w100">
                  <button className="u_switch u_switch-blue" type="submit">
                    パスワード変更
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

export default withChangePasswordForm(ChangePasswordForm)

import * as React from 'react'

const Footer = () => (
  <footer>
    <div className="footer">
      <div className="footer__block">
        <p className="footer__copy">Copyright &copy; MICROWAVE Inc. All rights reserved.</p>
        <ul className="footer__list">
          <li className="footer__list_item">
            <a className="footer__list_link" href="">
              利用規約
            </a>
            /
          </li>
          <li className="footer__list_item">
            <a className="footer__list_link" href="">
              プライバシーポリシー
            </a>
            /
          </li>
          <li className="footer__list_item">
            <a className="footer__list_link" href="">
              特定商取引に基づく表示
            </a>
            /
          </li>
          <li className="footer__list_item">
            <a className="footer__list_link" href="">
              お問い合わせ
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
)

export default Footer

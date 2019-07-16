import * as React from 'react'
import { corporate } from '../../config/Url'
import { Link } from 'react-router-dom'

class EmployeeMyPageContainer extends React.Component {
  render() {
    return (
      <div>
        <p>MyPage</p>
        <p>
          <Link to={corporate}>企業向け画面（デバッグ用リンク）</Link>
        </p>
      </div>
    )
  }
}

export default EmployeeMyPageContainer

import * as React from 'react'

class Header extends React.Component {
  render() {
    return (
      <>
        <header>
          <div>
            <p>
              <span>
                <img className="icon" src="/img/notification.png" alt="notification" />
              </span>
            </p>
            <p>
              <span>
                <img className="icon" src="/img/consultation.png" alt="notification" />
              </span>
            </p>
            <p>
              <span>
                <img className="icon" src="/img/employee.png" alt="notification" />
              </span>
            </p>
          </div>
          {/* TODO なんの情報が入るかはわからないが、プルダウンである事は確かである */}
          <div className="user-info">
            <p>
              <span>
                <img className="icon" src="/img/user_icon.png" alt="notification" />
              </span>
            </p>
            <p>
              <span className="user_name">Test Tarou</span>
            </p>
          </div>
        </header>
        {/* <Switch>
          <Route component={NotFound} />
        </Switch> */}
      </>
    )
  }
}

export default Header

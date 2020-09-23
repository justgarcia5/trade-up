import React, { useState, useEffect } from 'react'

const NavBar = props => {
  const [currentUser, setCurrentUser] = useState(props.current_user)
  const [notifications, setNotifications] = useState([])
  const [displayAlertClass, setDisplayAlertClass] = useState('')

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/notifications.json`);
        res
          .json()
          .then(notifications => {
            setNotifications(notifications);
            let alertClass = notifications.length > 0 ? "message_alert" : " "
            setDisplayAlertClass(alertClass);
          });
    }
    fetchData();
  }, []);

  const handleClick = () => {
    fetch('/notifications/mark_as_read/', {
      method: "POST",
      datatype: "JSON"
    }).then(res => res.json()).then((notifications) => {
      setNotifications(notifications)
    })
  }

  const notificationDisplay = notifications.length > 0 ? notifications.length : " ";

  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/"><b>AllTraderUp</b></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" id="trade" href="/products/new"><i className="fas fa-tags"></i> Trade <span className="sr-only">(current)</span></a>
            </li>

            {!currentUser &&
              <React.Fragment>
                <li className="nav-item">
                  <a href="/users/sign_in/" className="nav-link" >Sign in</a>
                </li>
                <li className="nav-item">
                  <a href="/users/sign_up/" className="nav-link" >Sign up</a>
                </li>
              </React.Fragment>
            }

            {currentUser &&
              <React.Fragment>
                <li className="nav-item dropdown">
                  <a className="nav-link" role="button" type="button" data-toggle="dropdown">
                    <i className="far fa-comment-dots text-white message_icon mt-1 mx-1"></i><i className={displayAlertClass}>{notificationDisplay}</i>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {notifications.length < 1 &&
                      <div>
                        <a className="dropdown-item color-black">No new messages</a>
                        <div className="dropdown-divider"></div>
                        <a href="/conversations" className="dropdown-item color-black">Inbox</a>
                      </div>
                    }
                    {notifications.length > 0 &&
                      notifications.map((notification, index) => {
                        return(
                          <div key={index} onClick={handleClick}>
                            <a href={notification.url} className="dropdown-item color-black">Message from {notification.sender.name}</a>
                          </div>
                        )
                      })
                    }
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={currentUser.image} className="nav-image mr-2 mb-1"/>{currentUser.name}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a href="/my_products" className="dropdown-item color-black">Products</a>
                    <a href="/users/edit" className="dropdown-item color-black">Profile</a>
                    <div className="dropdown-divider"></div>
                    <a href="/users/sign_out" rel="nofollow" data-method="delete" className="dropdown-item color-black">Sign out</a>
                  </div>
                </li>
              </React.Fragment>
            }

          </ul>
        </div>
      </nav>
    </div>
  )
}

export default NavBar

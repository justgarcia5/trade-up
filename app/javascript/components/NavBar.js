import React, { useState, useEffect } from 'react'

const NavBar = props => {
  const [currentUser, setCurrentUser] = useState(props.current_user)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    fetch(`/notifications.json`)
      .then(response => response.json())
      .then(notifications => {
        setNotifications(notifications);
      });
  }, []);

  console.log(notifications)

  return(
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">AllTraderUp</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* <form className="form-inline m-auto">
          <input className="form-control mr-sm-2 text-center" type="search" placeholder="Search" aria-label="Search">
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>  */}

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
                <li className="nav-item dropdown mx-2"  >
                  <a className="nav-link" role="button" type="button" className="btn" data-toggle="dropdown" data-behavior="notifications">
                    <i className="far fa-comment-dots m-1 message_icon"></i>
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {notifications.length < 1 && <a className="dropdown-item color-black">No messages</a>}
                    {notifications.map((notification, index) => <a key={index} href={notification.url} className="dropdown-item color-black">Inbox</a>)
                    }
                  </div>
                </li>
                <li className="nav-item dropdown mr-3">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src={currentUser.image} className="nav-image mr-2"/>{currentUser.name}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a href="/my-products" className="dropdown-item color-black">Products</a>
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
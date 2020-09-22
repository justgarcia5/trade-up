import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Products from '../pages/Products'
import UserProducts from '../pages/UserProducts'

export default function Landing(props) {
  const [currentUser, setCurrentUser] = useState(props.current_user)

  return (
    <div>
      <Router>
        <Switch>
          <Route path='/' exact component={Products} />
          <Route path='/my_products' exact component={() => <UserProducts currentUser={currentUser} />} />
        </Switch>
      </Router>
    </div>
  )
}

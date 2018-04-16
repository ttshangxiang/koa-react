import React from 'react'
import ReactDOM from 'react-dom'
import './app.less'
import { Route, Link, HashRouter as Router } from 'react-router-dom';
import MyRoute from './MyRoute'
import Home from './Home'
import A from './A'
import B from './B'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/a">About</Link>
            </li>
            <li>
              <Link to="/b">Topics</Link>
            </li>
          </ul>
          <hr/>
          <Route exact path='/' component={Home}/>
          <Route path='/a' component={A}/>
          <MyRoute path='/b' component={B}/>
        </div>
      </Router>
    )
  }
}

export default App
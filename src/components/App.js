import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import './app.less'
import Child from './Child'

class App extends React.Component {
  render() {
    return (
      <div>
        <div>这是react</div>
        <Child />
      </div>
    )
  }
}
export default hot(module)(App)
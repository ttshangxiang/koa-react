import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
require('es6-promise').polyfill()
require('isomorphic-fetch')
import { Provider } from 'react-redux';
import App from './components/App'
import store from './store'

const rootEl = document.getElementById('app')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store = { store } >
        <Component />
      </Provider>
    </AppContainer>,
    rootEl
  )
}

render(App)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default
    render(NextApp)
  })
}
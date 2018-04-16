import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import rootReducer from './reducers'
import { env } from '../config'

const initialState = {}

const middlewares = [apiMiddleware, thunkMiddleware]
const storeEnhancers = []

if (env !== 'production') {
  const reduxLogger = require('redux-diff-logger')
  middlewares.push(reduxLogger)
}

const createStoreWithMiddleware = compose(applyMiddleware(...middlewares), ...storeEnhancers)

const store = createStoreWithMiddleware(createStore)(rootReducer, initialState)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store

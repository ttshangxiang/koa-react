import {
  combineReducers
} from 'redux';

const count = (state = 0, action) => {
  const { type, data } = action
  switch (type) {
    case 'add':
      return ++state
    case 'sub':
      return --state
    default:
      return state
  }
}

const home = (state = 999, action) => {
  const { type } = action
  switch (type) {
    default:
      return state
  }
}

const Reducer = combineReducers({
  count,
  home
})

export default Reducer
import React from 'react'
import ReactDOM from 'react-dom'

class A extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>这是A</div>
    )
  }
}
export default A
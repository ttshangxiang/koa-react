import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { add, sub } from '../actions/count'

const mapStateToProps = (state) => {
  return {
      count: state.count
  }
}

const mapDispatchToProps = {
  add,
  sub
}

class Home extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div>这是主页sss</div>
        <div>{this.props.count}</div>
        <button onClick={this.props.add}>加</button>
        <button onClick={this.props.sub}>减</button>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
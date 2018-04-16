import React from 'react'
import { Route } from 'react-router-dom';

const MyRoute = ({ component: Component, ...rest }) => {

    const func = (props) => {
        // 可以进行处理
        console.log('处理')
        return <Component {...props}/>
    }

    return <Route {...rest} render={func}/>
}

export default MyRoute
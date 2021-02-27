import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { isObjectExists } from '../../helpers';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = localStorage.getItem('accessToken');
  const user = useSelector(state => state.userReducer.user);
  const checkIfValid = () => {
    if (isLoggedIn) {
      return true
    } 
    else {
      return false
    }
  }
  return (
    <Route
      {...rest}
      render={props =>
        checkIfValid() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}
export default PrivateRoute
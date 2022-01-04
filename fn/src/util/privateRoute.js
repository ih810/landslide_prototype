import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';
import decode from 'jwt-decode';
let decoded;
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  if(token){
    decoded = decode(token)
  }
  try {
    decode(token);
    decode(refreshToken);
    return true;
  } catch (error) {
    return false;
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
      <>
        <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
            <Component {...props} userId={decoded} />
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                }}
            />
            )
        }
        />
      </>
  );
}

export default PrivateRoute
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { token } = useContext(UserContext);

    return (
        <Route
            {...rest}
            element={token ? <Element /> : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;

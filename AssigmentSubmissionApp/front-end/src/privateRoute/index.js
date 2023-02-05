import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStorage';
import ajax from '../services/fetchService'

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    if (jwt) {
        ajax(`/api/auth/validate?token=${jwt}`, "get", jwt, null)
        .then((isValid) => {
            setIsValid(isValid);
            setIsLoading(false);
        });
    }
    else {
        return removeOldJwt();
    }

    function removeOldJwt() {
        localStorage.removeItem("jwt");
        return <Navigate to="/login"></Navigate>
    }

    return isLoading ? <div>Loading...</div> : (
        isValid ? children : removeOldJwt()
    ) ;
    /*if (jwt !== "") {
        return children;
    }
    else {
        return <Navigate to="/login"></Navigate>
    }*/
};

export default PrivateRoute;
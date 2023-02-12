import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AssigmentView from './assigmentView';
import Dashboard from './dashboard';
import Homepage from './homepage';
import Login from './login';
import PrivateRoute from './privateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode";
import { useLocalState } from './util/useLocalStorage';
import CodeReviewerDashboard from './codeReviewerDashboard';
import CodeReviewerAssigmentView from './codeReviewerAssigmentView';

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJwt());

  function getRolesFromJwt() {
    if (jwt) {
      const decodedJwt = jwt_decode(jwt);
      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <Routes>
      <Route path='/dashboard' element={
        roles.find((role) => role === "ROLE_CODE_REVIEWER") ? 
        (<PrivateRoute>
          <CodeReviewerDashboard/>
        </PrivateRoute>)
        : 
        (<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>)
      } />
      <Route path='/assigments/:id' element={
        roles.find((role) => role === "ROLE_CODE_REVIEWER") ? 
        (<PrivateRoute>
          <CodeReviewerAssigmentView/>
        </PrivateRoute>)
        : 
        (<PrivateRoute>
          <AssigmentView/>
        </PrivateRoute>)
      }>
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Homepage/>} />
    </Routes>
  );
}

export default App;

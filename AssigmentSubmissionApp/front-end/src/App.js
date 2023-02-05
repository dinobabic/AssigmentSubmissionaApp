import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AssigmentView from './assigmentView';
import Dashboard from './dashboard';
import Homepage from './homepage';
import Login from './login';
import PrivateRoute from './privateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path='/dashboard' element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
      } />
      <Route path='/assigments/:id' element={
        <PrivateRoute>
          <AssigmentView/>
        </PrivateRoute>
      }>
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={<Homepage/>} />
    </Routes>
  );
}

export default App;

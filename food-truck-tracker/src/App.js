import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="App">

      <Route exact path='/'>
        <SignupForm />
      </Route>
      <Route path='/LoginForm'>
        <LoginForm />
      </Route>
    </div>
  )}

export default App;

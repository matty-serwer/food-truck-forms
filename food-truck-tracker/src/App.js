import React from 'react';
import './App.css';
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div className="App">
      <h1>Food Truck TrackR Login</h1>
      {/* {<SignupForm />} */}
      {<LoginForm/>}
    </div>
  )}

export default App;

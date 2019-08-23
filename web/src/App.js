import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import Login from './Login';
import checkAuth from './checkAuth'

function Main({ history }) {

  const [auth, setAuth] = useState(false)
  useEffect(() => {
    checkAuth(history, () => {
      setAuth(true)
    })
  }, [history])

  if (!auth) {
    return <div className="App" />
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        </p>
        <Link to="/">hem</Link>
        <Link to="/fiskar">fiskar</Link>

      </header>
    </div>
  )
}

function App() {

  return (
    <Router>


      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" exact component={Login} />
        <Route path="/fiskar" render={(props) => <h1>FISKAR: {JSON.stringify(props)}</h1>} />
        <Route render={() => <h1>404 not found</h1>} />
      </Switch>
    </Router >
  );
}

export default App;

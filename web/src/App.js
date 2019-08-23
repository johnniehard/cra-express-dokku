import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function App() {

  const [ping, setPing] = useState('ping')

  useEffect(() => {
    async function getPing() {
      const pong = await (await fetch('/ping')).text()
      setPing(pong)
      console.log(pong)
    }
    getPing()
  }, [])

  return (
    <Router>

      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {ping}
          </p>
          <Link to="/">hem</Link>
          <Link to="/fiskar">fiskar</Link>

        </header>
        <Switch>
          <Route path="/" exact render={(props) => <h1>{JSON.stringify(props)}</h1>} />
          <Route path="/fiskar" render={(props) => <h1>FISKAR: {JSON.stringify(props)}</h1>} />
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

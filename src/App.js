import React from 'react';
import './App.css';
import Header from './Components/Header/Header'
import { useRoutes } from './routes'
import SystemList from './Page/SystemList'
import SystemInfo from './Page/SystemInfo'
import AuthPage from './Components/Auth/AuthPage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


function App() {

  const routes = useRoutes(false)

  return (
    <Router>
      <Header />
      <Route>
        <div>
          {routes}
        </div>
      </Route>
    </Router>
  );
}

export default App;

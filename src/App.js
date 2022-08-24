import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

import { Home } from './pages';

function App() {
  return (
    <div>
      <h4>comfy sloth starter</h4>
      <Home />
    </div>
  );
}

export default App;

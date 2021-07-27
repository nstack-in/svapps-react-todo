import App from './App';
import DedicatedPage from './DedicatedPage';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/:id" component={DedicatedPage} />
          <Route path="*" component={App} />
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
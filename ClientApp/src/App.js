import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { IngresoPin } from './components/IngresoPin';
import Operaciones from './components/Operaciones';
import Balance from './components/Balance';
import Reporte from './components/Reporte';
import { Retiro } from './components/Retiro';
import Error from './components/Error';

import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ingreso-pin" component={IngresoPin} />
          <Route path="/operaciones" component={Operaciones} />
          <Route path="/balance" component={Balance} />
          <Route path="/reporte" component={Reporte} />
          <Route path="/retiro" component={Retiro} />
          <Route component={Error} />
        </Switch>
      </Layout>
    );
  }
}

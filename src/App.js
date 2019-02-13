import React, { Component } from 'react';
import './App.css';
import Pane from './component/pane'
import { Provider } from 'react-redux';
import store from './store'
import {Router,Route} from 'react-router-dom';
import history from './common/history'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Pane></Pane>
        </Router>
      </Provider>
    )
  }
}

export default App;

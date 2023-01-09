import React, { Component } from 'react'
import Perf from 'react-addons-perf'
import TodoList from './containers/TodoList'
import './App.css'

window.Perf = Perf

export default class App extends Component {
  render() {
    return (
      <div>
        <p style={styles.p}>React Demo TodoList</p>
        <TodoList/>
      </div>
    );
  }
}

const styles = {
  p: {
    textAlign: 'center',
    marginBottom: '20px'
  }
}
import React, { Component } from 'react'
import Input from '../../components/Input'
import List from '../../components/List'

export default class TodoList extends Component{
  constructor (props) {
    super(props)
    this.state = {
      todos: []
    }
  }

  render () {
    return (
        <div>
          <Input submitFn={this.submitFn.bind(this)}/>
          <List todos={this.state.todos} deleteFn={this.deleteFn.bind(this)}/>
        </div>
    )
  }

  submitFn (value) {
    this.setState({
      todos: this.state.todos.concat(value)
    })
  }

  deleteFn (index) {
    let temp = this.state.todos
    temp.splice(index, 1)
    this.setState({
      todos: temp
    })
  }
}
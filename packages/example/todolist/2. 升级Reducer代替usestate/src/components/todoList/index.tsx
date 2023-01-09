import React, { FC, ReactElement, useCallback, useEffect, useReducer } from 'react'
import TdInput from './Input'
import TdList from './List'
import { todoReducer } from './reducer'
import { ACTION_TYPE, IState, ITodo } from './typings'
const initialState: IState = {
  todoList: []
}
const TodoList: FC = (): ReactElement => {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  useEffect(() => {
    console.log(state.todoList)
  }, [state.todoList])

  const addTodo = useCallback((todo: ITodo) => {
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo
    })
  }, [])
  return (
    <div className="todo-list">
      <TdInput addTodo={addTodo}
        todoList={state.todoList} />
      <TdList />
    </div>
  )
}

export default TodoList
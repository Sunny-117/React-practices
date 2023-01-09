import React, { FC, ReactElement, useCallback, useEffect, useReducer } from 'react'
import TdInput from './Input'
import TdList from './List'
import { todoReducer } from './reducer'
import { ACTION_TYPE, IState, ITodo } from './typings'
function init(initTodoList: ITodo[]): IState {
  return {
    todoList: initTodoList
  }
}
const TodoList: FC = (): ReactElement => {
  const [state, dispatch] = useReducer(todoReducer, [], init)//useReducer执行的时候才会创建出来一个state：惰性初始化（文档）
  useEffect(() => {
    // console.log(state.todoList)
    const todoList = JSON.parse(localStorage.getItem('todolist') || '[]');
    console.log(todoList)
    dispatch({
      type: ACTION_TYPE.INIT_TODOLIST,
      payload: todoList
    })
  }, [])//因为直走一次初始化，依赖空数组

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(state.todoList))
  }, [state.todoList])

  const addTodo = useCallback((todo: ITodo): void => {
    dispatch({
      type: ACTION_TYPE.ADD_TODO,
      payload: todo
    })
  }, [])

  const removeTodo = useCallback((id: number): void => {
    dispatch({
      type: ACTION_TYPE.REMOVE_TODO,
      payload: id
    })
  }, [])
  const toggleTodo = useCallback((id: number): void => {
    dispatch({ type: ACTION_TYPE.TOGGLE_TODO, payload: id })
  }, [])
  return (


    <div className="todo-list">
      <TdInput
        addTodo={addTodo}
        todoList={state.todoList} />
      <TdList
        todoList={state.todoList}
        removeTodo={removeTodo}
        toggleTodo={toggleTodo} />
    </div>
  )
}

export default TodoList
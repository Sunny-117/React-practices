import React, { useRef, FC, ReactElement } from 'react'
import { ITodo } from '../typings';
interface IProps {
  addTodo: (todo: ITodo) => void;
  todoList: ITodo[];
}
const TdInput: FC<IProps> = ({
  addTodo,
  todoList
}): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addItem = (): void => {
    const val: string = inputRef.current!.value.trim()
    if (val.length) {
      const isExist = todoList.find(todo => todo.content === val)
      if (isExist) {
        alert('已存在')
        return
      }
      addTodo({
        id: new Date().getTime(),
        content: val,
        completed: false
      })
      inputRef.current!.value = ''
    }
  }
  return (
    <div className="td-input">
      <input type="text" placeholder="请输入代办" ref={inputRef} />
      <button onClick={addItem}>增加</button>
    </div>
  )
}

export default TdInput
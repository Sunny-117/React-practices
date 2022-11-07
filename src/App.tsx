import React, { useState } from 'react'
// 实现一个 百度搜索框 （搜索提示）

export default function App() {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const list = [
    '前端1', '前端2', '前端3', '前端3', '前端5', '前端5', '前端6', '前端7',
  ]
  return (
    <div>
      <input type="text" name="" id=""
        value={value}
        onChange={(e) => {
          setShow(true)
          setValue(e.target.value)
        }}
      />
      <ul>
        {show && list.map((item, index) => {
          return <li key={index}>
            {item}
          </li>
        })}
      </ul>
    </div>
  )
}

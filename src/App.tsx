import React, { useEffect, useState } from 'react'
// 实现一个 百度搜索框 （搜索提示）

export default function App() {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)

  const list = ['前端1', '前端2', '前端3', '前端3', '前端5', '前端5', '前端6', '前端7']

  return (
    <div>
      <input type="text"
        value={value}
        onChange={(e) => {
          setShow(true)
          const newValue = e.target.value
          if (newValue === '') {
            setShow(false)
          }
          setValue(newValue)
        }}
      />
      <ul>
        {show && list.map((item, index) => {
          console.log(item)
          return <li key={index}>
            {item}
            {/* <span style={{
              color: 'red'
            }}>{item}</span> */}
          </li>
        })}
      </ul>
    </div>
  )
}

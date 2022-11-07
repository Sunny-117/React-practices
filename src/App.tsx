import React, { useEffect, useState } from 'react'
// 实现一个 百度搜索框 （搜索提示）

const getList = (keyWords) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(['前端1', '前端2', '前端3', '前端3', '前端5', '前端5', '前端6', '前端7',])
      } else {
        reject('error')
      }
    }, Math.random() * 1000)
  })
}
export default function App() {
  const [value, setValue] = useState('')
  const [list, setList] = useState([])
  const [show, setShow] = useState(false)
  const fetchList = async (value) => {
    const res: any = await getList(value)
    setList(res)
  }
  useEffect(() => {
    (async () => {
      const res: any = await fetchList(value)
      console.log(res)
      setList(res)
    })()
  }, [value, fetchList])

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
          return <li key={index}>
            {item}
          </li>
        })}
      </ul>
    </div>
  )
}

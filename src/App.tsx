import React, { useState } from 'react';
import { Reverse } from './package/Reverse';

const ListComp = () => {
  const [arr, setArr] = useState([1, 2, 3, 4, 5]);
  const handleClick = () => {
    const newArr = arr.reverse();
    setArr(newArr.slice())
  }
  return <div>
    <ul>
      {arr.map(item => {
        return <li>{item}</li>
      })}
    </ul>
    <button onClick={handleClick}>dianji </button>
  </div>
}


export default function App() {
  return (
    <div>
      {/* @ts-ignore */}
      <Reverse ListComp={ListComp} />
    </div>
  )
}

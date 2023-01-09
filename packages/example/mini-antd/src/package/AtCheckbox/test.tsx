import React from 'react'
import { AtCheckbox } from '.'


export const Test = () => {
    const onChange = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    };
  return (
    <div>
        <AtCheckbox onChange={onChange}/>
    </div>
  )
}

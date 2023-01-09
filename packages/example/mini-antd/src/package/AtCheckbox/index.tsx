import React, { useState } from 'react'

interface IProps {
    onChange: (v:any)=>void;
}
export const AtCheckbox = ({onChange}:IProps) => {
  const [value, setValue] = useState('black')
  return (
    <div>
        <input type="checkbox" onChange={onChange} />
        <input type="color" value={value} onChange={(e)=>{
          setValue(e.target.value)
        }} />
        <div style={{
          width:'100px',
          height:'100px',
          backgroundColor:value 
        }}></div>
    </div>
  )
}

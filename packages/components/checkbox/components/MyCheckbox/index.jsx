
export default function MyCheckbox({ children, onChange, checked }) {

  const createText = () => {
    if (typeof children !== 'string') {
      return ''
    }
    return <span>{children}</span>
  }
  return (
    <div>
      <input type="checkbox" name="" id="" className='my-checkbox' checked={checked} onChange={e => onChange(e)} />
      {createText()}
    </div>
  )
}

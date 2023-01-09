import './index.scss';
const btnTypes = [
  'primary',
  'success',
  'warn',
  'danger'
]
export default function MyButton({ type, children, ...restProps }) {
  const createStyleClass = () => {
    let _type = btnTypes.includes(type)
    _type = _type ? `btn-${type}` : `btn-primary`;
    return ['btn', _type].join(' ')
  }

  return (
    <div>
      <button {...restProps} className={createStyleClass()}>{children}</button>
    </div>
  )
}

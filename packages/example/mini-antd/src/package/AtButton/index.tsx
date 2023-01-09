import { ReactNode } from 'react'
import './index.css'
interface IProps {
    type: string;
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
}
const classMapToType = {
    'primary': 'primary-color',
    'warn': 'warn-color',
    'error': 'error-color'
}
export const AtButton = ({ type, children, onClick, disabled, loading }: IProps) => {
    return (
        <div>
            {/* @ts-ignore */}
            <button disabled={disabled} onClick={onClick} className={classMapToType[type]}>{children}{loading ? 'loading' : null}</button>

        </div>
    )
}


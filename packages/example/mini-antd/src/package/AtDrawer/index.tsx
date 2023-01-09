
import './index.css'

export default function AtDrawer({ title, placement, onClose, open, children }: any) {
    return (
        <div className={`drawer-wrapper ${open ? 'right' : ''}`} onClick={(e) => {
            // @ts-ignore
            if (e.target.className === 'drawer-wrapper') {
                onClose()
            }
        }}>
            <div className="modal">
                {children}
            </div>
        </div>
    )
}

export default function Tree({ data, show = true, setShow }) {
    // const setShow = (item) => {
    //     // 子组件通知父组件更改
    // }
    return (
        <ul style={{
            display: show ? 'block' : 'none'
        }}>
            {
                Array.isArray(data) && data.length && data.map(item => {
                    return <li key={item.value} onClick={(e) => {
                        e.stopPropagation()// 清楚冒泡
                        setShow(item)
                    }}>
                        {item.value}
                        {item.children && <Tree setShow={setShow} data={item.children} show={item.show}></Tree>}
                    </li>
                })
            }
        </ul>
    )
}

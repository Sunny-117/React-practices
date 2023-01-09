import { useState } from "react"
import { AtButton } from "."

const App = () => {
    const [loading, setLoading] = useState(false)
    return (
        <div>
            <AtButton onClick={() => {
                console.log(111)
            }} type="primary">点击</AtButton>
            <AtButton type="warn" disabled>点击</AtButton>
            <AtButton type="error" loading={loading} onClick={() => {
                setLoading(true)
            }}>点击</AtButton>
        </div>
    )
}
export default App
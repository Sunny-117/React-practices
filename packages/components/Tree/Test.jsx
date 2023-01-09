import { useEffect, useState } from "react"
import Tree from "./index"
import getData from './mockData'
export default function TreeTest() {
    const [data, setData] = useState([])

    useEffect(() => {
        getData().then(res => {
            setData(recursionConfigProp(res))
        })
    }, [])
    // 当数据请求过来后我们要递归的给每个数据加一个属性，用来控制展开功能
    // 一个函数，根据不同的参数作出不同的响应：函数重载
    let recursionConfigProp = (data, type, id) => {
        return data.map(item => {
            if (type === 'reset') {
                if (item.value === id) {
                    item.show = !item.show
                }
            } else if (typeof item.show !== 'boolean') {
                // 初始化
                item.show = false;
            }
            if (item.children) {
                if (type === 'reset') {
                    recursionConfigProp(item.children, type, id)
                } else {
                    recursionConfigProp(item.children)
                }
            }
            return item;
        })
    }
    let setShow = (son) => {
        // const arr = data.map(item => {
        //   if (item.value === son.value) {
        //     item.show = !item.show
        //   }
        //   return item;
        // })
        setData(recursionConfigProp(data, 'reset', son.value))
    }
    return (
        <div>
            <Tree data={data} setShow={setShow} />
        </div>
    )
}

import React, { useState } from 'react'


const init = (data: any) => {
    return data.map((item: any) => {
        if (item?.children?.length) {
            item.open = 'open'
            item.children = init(item.children)
        } else {
            item.open = ''
        }
        item.checked = ''// '' checked 
        return item;
    })
}
const Demo = () => {
    const [className, setClassName] = useState('')
    const [rootData, setRootData] = useState(init([
        {
            id: "1",
            name: "Office Map"
        },
        {
            id: "2",
            name: "New Employee Onboarding",
            children: [
                {
                    id: "8",
                    name: "Onboarding Materials"
                },
                {
                    id: "9",
                    name: "Training"
                }
            ]
        },
        {
            id: "3",
            name: "Office Events",
            children: [
                {
                    id: "6",
                    name: "2018",
                    children: [
                        {
                            id: "10",
                            name: "Summer Picnic"
                        },
                        {
                            id: "11",
                            name: "Valentine's Day Party"
                        },
                        {
                            id: "12",
                            name: "New Year's Party"
                        }
                    ]
                },
                {
                    id: "7",
                    name: "2017",
                    children: [
                        {
                            id: "13",
                            name: "Company Anniversary Celebration"
                        }
                    ]
                }
            ]
        },
        {
            id: "4",
            name: "Public Holidays"
        },
        {
            id: "5",
            name: "Vacations and Sick Leaves"
        }
    ]))
    const Tree = ({ data, className }: any) => {
        return <ul className={className} >
            {data.map((item: any) => {
                return <li key={item.id} className={`${item.open}`}>
                    <div className="tree-title">
                        <div onClick={() => {
                            if (item.open === 'open') {
                                item.open = 'close'
                            } else {
                                item.open = 'open'
                            }
                            setRootData([...rootData])
                        }}
                        // className={`folder ${item.open}`}
                        >
                            {/* 折叠 */}
                            <div className={`icon ${item.checked}`}></div>

                            <div>{item.name}</div>
                        </div>

                        {/* 图标 */}

                    </div>

                    {item.children ? <Tree data={item.children} className={className} />
                        : null}
                </li>
            })}
        </ul>
    }


    return (
        <div>

            <Tree data={rootData} className={className} />
        </div>
    )
}

export default Demo



const SubTee = ({ data }) => {
    return <ul>
        {data.map((item, index) => {
            return <li key={index}>{item.title}
                {item.children && <SubTee data={item.children} />}
            </li>
        })}
    </ul>
}

const Tree = ({ data }) => {
    return <SubTee data={data} />
}

export default Tree



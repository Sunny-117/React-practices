
export function Accordion(props) {
    // 目前显示的 index
    const [bindIndex, setBindIndex] = React.useState(props.defaultIndex);
    // 点击即把 bindIndex 设置为自己
    const changeItem = itemIndex => {
        if (typeof props.onItemClick === "function") props.onItemClick(itemIndex);
        if (itemIndex !== bindIndex) setBindIndex(itemIndex);
    };
    // 筛选出传入的 AccordionItem 组件，忽略其他
    // item.type 对应 react 组件自身的函数， 函数.name 是函数名
    // 在本地环境，没有压缩，函数名就是组件名 AccordionItem
    // 线上压缩后，函数名没改为了单个字母，自然就无法判断了
    // 解决方案：跟它本身 .name 比较即可
    const items = props.children.filter(
        item => item.type.name === AccordionItem.name
    );

    return (
        <div className="wrapper">
            {items.map(({ props }) => (
                <AccordionItem
                    isCollapsed={bindIndex === props.index}
                    label={props.label}
                    handleClick={() => changeItem(props.index)}
                    children={props.children}
                />
            ))}
        </div>
    );
}
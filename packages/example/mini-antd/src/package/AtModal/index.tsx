import { Alert, Modal, Table } from 'antd';
import './style.css'
interface IDataSouce {
    address: string;
    name: string;
    key: string
    age: number;
}
interface IProps {
    show: boolean;
    onOk: () => void;
    onCancel: () => void
    isBatchDelete: boolean;
    dataSource: IDataSouce[]
    failDeleteNum?: number;
    succDeleteNum?: number;
    failDisableNum?: number;
    succDisNum?: number;
}
export const AtModal = (props: IProps) => {
    const {
        dataSource,
        show,
        onOk,
        onCancel,
        isBatchDelete,
        failDeleteNum,
        succDeleteNum,
        failDisableNum,
        succDisNum } = props;
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
    ];
    const text = () => {
        if (isBatchDelete) {
            //  删除
            // failDeleteNum
            return `删除成功的写作者数量${succDeleteNum}, 删除失败的写作者数量:${failDeleteNum}`
        } else {
            // 停用
            // failDisableNum
            return `停用成功的写作者数量${succDisNum}, 停用失败的写作者数量:${failDisableNum}`

        }
    }
    return (
        <div>
            <Modal title={isBatchDelete ? '批量删除' : '批量停用'}
                open={show}
                onOk={onOk}
                onCancel={onCancel}>
                <Alert message="Success Text" type="success" />
                <div>
                    {text()}
                </div>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </Modal>

        </div>
    )
}



// failDeleteNum: 删除失败的数量
// failDisableNum: 停用失败的数量

// case1:删除成功的写作者数量{}，删除失败的写作者数量{}
// case2:停用成功的写作者数量{}，停用失败的写作者数量{}
// 1. 分析需要的后端字段
// 2. 优雅完成
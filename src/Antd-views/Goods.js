import React from 'react';
import { Space, Button, Modal, Table, Tag } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

const columns = [
    {
        title: 'ID',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '标题',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '图片',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Invite {record.id}</a>
                <a onClick={()=>showConfirm()}>Delete</a>
            </Space>
        ),
    },
];

const showConfirm = () => {
    confirm({
        title: '您确定要删除这个数据吗?',
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        onOk() {
            console.log('已删除');
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};

const data = [
    {
        id: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        id: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        id: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];
const Goods = () => {
    // useEffect(() => {
    //     return () => {
    //         axios
    //     };
    // }, [input]);

    return (
        <Table columns={columns} dataSource={data} />
    )
}
export default Goods;
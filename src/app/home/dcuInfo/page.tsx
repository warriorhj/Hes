/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:43:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-16 18:32:57
 * @FilePath: \Hes\src\app\home\dcuInfo\page.tsx
 */
'use client'
import {useState, useEffect, useRef} from 'react'
import {Table, Tag, Space, Input, Button, Modal, Form} from "antd";
import type {ColumnsType} from 'antd/es/table';
import * as dayjs from 'dayjs';
import WModal from '@/app/components/WModal';

interface DcuType {
    dcuno: string,
    protocol: number,
    builddata: Date,
    orgcode: string,
}



const DcuProps = {
    title: 'Add Dcu',
    content: {
        type: 'Form',
        form: [
            {
                label: 'dcuno',
                type: 'input',
                require: true,
                placeholder: 'Please input dcuno',
            },
            {
                label: 'protocol',
                type: 'input',
            },
            {
                label: 'orgcode',
                type: 'input',
            },
        ]
    }
}
const dcuInfo = () => {

    // table 中 columns的配置
    const columns: ColumnsType<DcuType> = [
        {
            title: 'dcuno',
            dataIndex: 'dcuno',
            key: 'dcuno',
        },
        {
            title: 'protocol',
            dataIndex: 'protocol',
            key: 'protocol',
            render: (val) => <Tag>{val || '-'}</Tag>
        },
        {
            title: 'builddata',
            dataIndex: 'builddata',
            key: 'builddata',
            render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: 'orgcode',
            key: 'orgcode',
            dataIndex: 'orgcode',
            render: (val) => <Tag>{val || '-'}</Tag>
        },
        {
            title: 'Operation',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => (
            <Space size="middle">
                <Button type='link' onClick={()=>handleChangeDcu(record)}>Change</Button>
                <Button type='link' danger onClick={()=>handleDeleteDcu(record)}>Delete</Button>
            </Space>
            ),
        }
    ]
    
    // 查询Input框
    const [meterQuery, setmeterQuery] = useState('');
    // 获取antd的form
    const [form] = Form.useForm()
    // 对话框的开关
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalProps, setModalProps] = useState({});


    const [dataSource, setDataSource] = useState([
        {
            dcuno: "1111015600",
            protocol: 16,
            builddata: new Date(2006,0,12,22,19,35),
            orgcode: 4,
        },
        {
            dcuno: "11110156001",
            protocol: 3,
            builddata: new Date(2007,0,12,22,19,35),
            orgcode: 4,
        }
      ])

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);


    const [isDisabled, setIsDisabled] = useState(true)

    // 111 处理 添加dcu按钮
    const handleAddDcu = () => {
        setIsModalOpen(true);
        const tempProps = Object.assign({}, DcuProps,{
            handleOk: () => setIsModalOpen(false),
        })
        setModalProps(tempProps)
        
    }


    // 222 处理 修改dcu按钮
    const handleChangeDcu = (record: DcuType) => {
        setIsModalOpen(true);
        let tempProps = Object.assign({}, DcuProps,{
            handleOk: () => setIsModalOpen(false),
            initvalue: record,
        })
        tempProps.title = 'Change Dcu';
        setModalProps(tempProps)
    }

    // 333 删除dcu按钮
    const handleDeleteDcu = (record: DcuType) => {
        // console.log(record)
        // 调用删除接口
    }
 
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const handleQuery = (value: string) => {
        console.log(value)
        // 调用search方法，更新dataSource
         
    }

    const tableRef = useRef()

    // 添加确认
    const handleOk = () => {
        // 获取form表单中的数据 对象类型
        setIsModalOpen(false);
        let formValue = form.getFieldsValue();
        formValue.builddata = new Date();
        let tempState = Object.assign([], dataSource)
        tempState.push(formValue)
        console.log(tempState)
        setDataSource(tempState)
        form.resetFields()
        // 将数据上传接口
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: any)=>{
        console.log(value.target.value)
        // 搜索产品进行更新table列表
    }

    // 后端请求接口
    useEffect(()=>{
        fetchData()
        // console.log(tableRef.current)
        setIsDisabled(selectedRowKeys.length ? false : true)

    },[selectedRowKeys])
    
    // 获取数据 同时更新table
    const fetchData = () => {
        // console.log('获取数据')
    }


    return (
        <>
            <div>
                <Input placeholder="dcuno" onChange={handleChange} style={{width: 150, margin: 10}}/>
                <Button type='default' onClick={handleQuery}>Query</Button>
                <Button type='primary'onClick={handleAddDcu}>Add</Button>
                <Button type='primary' danger disabled={isDisabled}>Batch delete</Button>
            </div>
            <Table
                ref={tableRef}
                rowSelection={rowSelection}
                columns={columns}  
                dataSource={dataSource} 
                rowKey={(record)=>record.dcuno}
                pagination={pagination}
            >
            </Table>

            <WModal
                open={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                propValue={modalProps}
                >
            </WModal>           
        </>
    )
}

export default dcuInfo;
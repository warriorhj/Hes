/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:43:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-20 11:20:34
 * @FilePath: \hes\src\app\home\dcuInfo\page.tsx
 */
'use client'
import {useState, useEffect, useRef} from 'react'
import {Table, Tag, Space, Input, Button, Modal, Form, Popconfirm} from "antd";
import type {ColumnsType} from 'antd/es/table';
import * as dayjs from 'dayjs';
import WModal from '@/app/components/WModal';

interface DcuType {
    dcuno: string,
    protocol: number,
    builddate: Date,
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
            align: 'center',
        },
        {
            title: 'protocol',
            dataIndex: 'protocol',
            key: 'protocol',
            align: 'center',
            render: (val) => <Tag>{val || '-'}</Tag>
        },
        {
            title: 'builddata',
            dataIndex: 'builddata',
            key: 'builddata',
            align: 'center',
            render: (val) => dayjs(val).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: 'orgcode',
            key: 'orgcode',
            dataIndex: 'orgcode',
            align: 'center',
            render: (val) => <Tag>{val || '-'}</Tag>
        },
        {
            title: 'Operation',
            key: 'action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) => (
            <Space size="middle">
                <Button type='link' onClick={()=>handleChangeDcu(record)}>Change</Button>
                <Popconfirm
                    title="Delete the Dcu"
                    description={"Are you sure to delete this dcu:" + record.dcuno}
                    okText="Confirm"
                    cancelText="cancel"
                    onCancel={() => handleDeleteDcu(record)}
                    onConfirm={() => handleDeleteDcu(record)}
                  >
                    <Button type='link' danger>Delete</Button>
                </Popconfirm>
            </Space>
            ),
        }
    ]
    
    // 查询Input框
    const [dcuQuery, setdcuQuery] = useState('');
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
    
    const tableRef = useRef()  // 没用上
    const formRef = useRef()   
    
    // 111 处理 添加dcu按钮
    const handleAddDcu = () => {
        setIsModalOpen(true);
        const tempProps = Object.assign({}, DcuProps,{
            handleOk: async () => {
                const insertData = formRef.current?.formFields();
                const result = await fetch('/api/dcu/insertDcu',{
                method: "POST",
                body: JSON.stringify(insertData),
                })
                // console.log(result)
                formRef.current?.formResets();
                setIsModalOpen(false)
                // 刷新页面数据
                handleQuery();
            },})
        setModalProps(tempProps)
    }


    // 222 处理 修改dcu按钮
    const handleChangeDcu = (record: any) => {
        setIsModalOpen(true);
        let tempProps = Object.assign({}, DcuProps,{
            handleOk: async () => {
                const changeData = formRef.current?.formFields();
                const updateData = Object.assign({},changeData,{id:record._id})
                const result = await fetch('/api/dcu/updateDcu',{
                    method: "PUT",
                    body: JSON.stringify(updateData),
                }).then(data=>data.json())
                .then(res=>{
                    console.log(res)
                })
                setIsModalOpen(false);
                // 刷新页面数据
                handleQuery();   
            },
            initvalue: record,
        })
        tempProps.title = 'Change Dcu';
        setModalProps(tempProps)
    }

    // 333 删除dcu按钮
    const handleDeleteDcu = async (record: DcuType) => {
        // console.log(record)
        // 调用删除接口
        const deletelist = JSON.stringify([record.dcuno]);
        const result = await fetch(`/api/dcu/deleteDcu/${deletelist}`,{
            method: "DELETE",
        }).then(res=>res.json()).then(res=>{
            console.log(res);
        })
        // 刷新页面数据
        handleQuery();
    }
    // 批量删除
    const handleBatchDelete = async () =>{
        // console.log('批量删除ID', typeof selectedRowKeys, selectedRowKeys);
        const deletelist = JSON.stringify(selectedRowKeys);
        const result = await fetch(`/api/dcu/deleteDcu/${deletelist}`,{
            method: "DELETE",
        }).then(res=>res.json()).then(res=>{
            console.log(res)
        })
        // 刷新页面数据
        handleQuery();
    }
 
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    const handleQuery = async () => {
        // 调用search方法，更新dataSource
        const result = await fetch(`/api/dcu/getBydcuno?dcuno=${dcuQuery}`)
        .then(res=>res.json())
        .then(res=>{
            setDataSource(res.res)
        })
        setdcuQuery('');
    }


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
        // 刷新页面数据
        handleQuery();
        setIsDisabled(selectedRowKeys.length >=2 ? false : true)
    },[selectedRowKeys])
    
    // 获取数据 同时更新table
    


    return (
        <>
            <div>
                <Input value={dcuQuery} placeholder="dcuno" onChange={(e)=>setdcuQuery(e.target.value)} style={{width: 150, margin: 10}}/>
                <Button type='default' onClick={handleQuery}>Query</Button>
                <Button type='primary'onClick={handleAddDcu}>Add</Button>
                <Button type='primary' danger disabled={isDisabled} onClick={handleBatchDelete}>Batch delete</Button>
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
                ref={formRef}
                open={isModalOpen}
                handleCancel={() => setIsModalOpen(false)}
                propValue={modalProps}
                >
            </WModal>           
        </>
    )
}

export default dcuInfo;
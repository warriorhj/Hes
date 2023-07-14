/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:42:53
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-15 00:25:10
 * @FilePath: \Hes\src\app\home\meterInfo\page.tsx
 */
'use client'
import {useState, useEffect, useRef, createRef} from 'react'
import {Table, Tag, Space, Input, Button, Modal, Form} from "antd";
import type {ColumnsType} from 'antd/es/table';
import * as dayjs from 'dayjs';

interface MeterType {
    meterno: string,
    protocol: number,
    builddata: Date,
    metertype: number,
    metermode: number
}



// const dataSource: MeterType[] = ;


const meterInfo: React.FC = () =>{
    
    const columns: ColumnsType<MeterType> = [
        {
            title: 'meterno',
            dataIndex: 'meterno',
            key: 'meterno',
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
            title: 'metertype',
            key: 'metertype',
            dataIndex: 'metertype',
            align: 'center',
            render: (val) => <Tag>{val}</Tag>
        },
        {
            title: 'metermode',
            key: 'metermode',
            dataIndex: 'metermode',
            align: 'center',
            render: (val) => <Tag>{val}</Tag>
        },
        {
            title: 'Operation',
            key: 'action',
            dataIndex: 'action',
            align: 'center',
            render: (_, record) => (
            <Space size="middle">
                <Button type='link' onClick={() => handleChangeMeter(record)}>Change</Button>
                <Button type='link'>Delete</Button>
                <Button type='link'>ReadData</Button>
                <Button type='link'>SendToken</Button>
                <Button type='link'>Action</Button>
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

    const [dataSource, setDataSource] = useState([
        {
            meterno: "1111015600",
            protocol: 3,
            builddata: new Date(2006,0,12,22,19,35),
            metertype: 4,
            metermode: 2
        },
        {
            meterno: "11110156001",
            protocol: 3,
            builddata: new Date(2007,0,12,22,19,35),
            metertype: 4,
            metermode: 2
        }
      ])

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [isDisable, setIsDisabled] = useState(true)

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }
    

    // 表达确认
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
        
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value: any)=>{
        // console.log(value.target.value)
        // 搜索产品进行更新table列表
        setmeterQuery(value.target.value)
    }

    const handleBatchDelete = () =>{
        console.log('批量删除ID', selectedRowKeys);
    }

    const inputRef = createRef();
    const [modelTitle, setModelTitle] = useState('');

    // 查询接口
    const handleQuery = () =>{
        // 请求
        
        setmeterQuery('')
    }

    // 添加meter按钮
    const handleAddMeter = () =>{
        setIsModalOpen(true)
        setModelTitle('Add Meter')
    }

    // table中的修改按钮
    const handleChangeModal = () =>{
        setIsModalOpen(true)
        setModelTitle('Change Meter')
    }
   
    // 修改meter按钮
    const handleChangeMeter = (value: any) =>{
        // 打开对话框，设置form的值
        
        setIsModalOpen(true)
        form.setFieldsValue(value)
        // console.log(value)
    }

    useEffect(() => {

        setIsDisabled(selectedRowKeys.length ? false : true)

    },[selectedRowKeys])

    
    
    return (
        <>
            <div>
                {/* <input value={meterQuery} onChange={handleChange} style={{borderRadius:5, height: 30}}/> */}
                <Input value={meterQuery} placeholder='meterno' onChange={handleChange} style={{width: 150, margin: 10}}/>
                <Button type='default' onClick={handleQuery}>Query</Button>
                <Button type='primary'onClick={handleAddMeter}>Add</Button>
                <Button type='primary' danger disabled={isDisable} onClick={handleBatchDelete}>Batch delete</Button>
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}  
                dataSource={dataSource}
                rowKey={(record)=>record.meterno} 
            >
            </Table>
            <Modal title={modelTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 , textAlign: 'center' }}
                    autoComplete="off"
                    labelAlign='left'
                    form={form}
                >
                    <Form.Item
                        label="meterno"
                        name="meterno"
                        rules={[{ required: true, message: 'Please input meterno!' }]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="metermodel"
                        name="metermodel"
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="manufacturer"
                        name="manufacturer"
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="orgcode"
                        name="orgcode"
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="ctratio"
                        name="ctratio"
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="ptratio"
                        name="ptratio"
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="protocol"
                        name="protocol"
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="metertype"
                        name="metertype"
                        rules={[{ required: true, message: 'Please input metertype!' }]}
                        >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="metermode"
                        name="metermode"
                        rules={[{ required: true, message: 'Please input metermode!' }]}
                        >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
                
        </>
    )
}

export default meterInfo;
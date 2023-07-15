/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:42:53
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-15 17:43:17
 * @FilePath: \Hes\src\app\home\meterInfo\page.tsx
 */
'use client'
import {useState, useEffect, useRef, createRef} from 'react'
import {Table, Tag, Space, Input, Button, Modal, Form, Cascader} from "antd";
import type {ColumnsType} from 'antd/es/table';
import * as dayjs from 'dayjs';
import WModal from '@/app/components/WModal';

interface MeterType {
    meterno: string,
    protocol: number,
    builddata: Date,
    metertype: number,
    metermode: number
}

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}


const readMeterDataOptions: Option[] = [
    {
      value: 'InstantaneousValue',
      label: 'InstantaneousValue',
      children: [
        {
          value: 'A phase voltage',
          label: 'A phase voltage',
        },
        {
          value: 'A phase current',
          label: 'A phase current',
        },
        {
          value: 'A phase power factor',
          label: 'A phase power factor',
        }
      ],
    },
    {
      value: 'Energy',
      label: 'Energy',
      children: [
        {
          value: 'Active energy (|+A|-|-A|) Net total',
          label: 'Active energy (|+A|-|-A|) Net total',
        },
        {
           value: 'Active energy (|+A|-|-A|) Net tariff1',
           label: 'Active energy (|+A|-|-A|) Net tariff1',
        }
      ],
    },
  ];


// const dataSource: MeterType[] = ;



// meter add 和 change 表单数据
const MeterProps = {
    title: 'Add Meter',
    content: {
        type: 'Form',
        form: [
            {
                type: 'input',
                require: true,
                label: 'meterno',
            },
            {
                type: 'input',
                label: 'metermodel',
            },
            {
                type: 'input',
                label: 'manufacturer',
            },
            {
                type: 'input',
                label: 'orgcode',
            },
            {
                type: 'input',
                label: 'ctratio',
            },
            {
                type: 'input',
                label: 'ptratio',
            },
            {
                type: 'input',
                label: 'protocol',
            },
            {
                type: 'input',
                require: true,
                label: 'metertype',
            },
            {
                type: 'input',
                require: true,
                label: 'metermode',
            }
        ]
    },
}
// meter 中的readdata表单数据
const ReadDataProps = {
    title: 'ReadData',
    content: {
        type: 'Form',
        form: [
            {
                type: 'input',
                require: true,
                label: 'meterno',
            },
            {
                type: 'cascade',
                label: 'Cim',
                list: readMeterDataOptions
            }
        ]
    },
}
// meter 中的sendtoken表单数据
const SendTokenProps = {
    title: 'SendToken',
    content: {
        type: 'Form',
        form: [
            {
                type: 'input',
                require: true,
                label: 'meterno',
            },
            {
                type: 'input',
                require: true,
                label: 'token',
            }
        ]
    },
}
// meter 中的action表单数据
const ActionProps = {
    title: 'Action',
    content: {
        type: 'Text',
        textArea: 'Please select connnect or disconnect the switch',
    },
}

const meterInfo: React.FC = () =>{

    // 状态state部分
    // 对话框的开关
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 对话框的props
    const [modalProps, setModalProps] = useState({});
    
    // 查询Input框
    const [meterQuery, setmeterQuery] = useState('');
    // 获取antd的form
    const [form] = Form.useForm()

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


    // Table中的columns
    // table渲染的列
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
                <Button type='link' onClick={() => handleDeleteMeter(record)}>Delete</Button>
                <Button type='link' onClick={() => handleReadDataMeter(record)}>ReadData</Button>
                <Button type='link' onClick={() => handleSendTokenMeter(record)}>SendToken</Button>
                <Button type='link' onClick={() => handleActionMeter(record)}>Action</Button>
            </Space>
            ),
        }
    ]
    
    // 111 顶部table操作部分  添加meter按钮
    const handleAddMeter = () =>{
        setIsModalOpen(true)
        const tempProps = Object.assign({}, MeterProps, {handleOk: ()=>{
            // 添加meter接口
            setIsModalOpen(false)
        },})
        setModalProps(tempProps)
    }

    // 顶部query按钮 
    const handleQuery = () =>{
        // 请求
        setmeterQuery('')
        // 查询接口
    }
    
    // 批量删除meter
    const handleBatchDelete = () =>{
        console.log('批量删除ID', selectedRowKeys);
    }

    // 222 table中columns的change操作
    const handleChangeMeter = (value: any) =>{
        console.log('修改ID', value);
        setIsModalOpen(true)
        const tempProps = Object.assign({}, MeterProps, {handleOk: ()=>{
            // 修改meter接口
            setIsModalOpen(false)
        },
        initvalue: value,})
        setModalProps(tempProps)
        form.setFieldsValue(value)
        
    }

     // table中的读取数据按钮
     const handleReadDataMeter = (value: any) =>{
        // 打开对话框，设置form的值
        setIsModalOpen(true)
        const tempProps = Object.assign({}, ReadDataProps, {handleOk: ()=>{
            // 读取数据接口
            setIsModalOpen(false)
        },
        initvalue: value,})
        setModalProps(tempProps)
    }

    // table中的send token按钮
    const handleSendTokenMeter = (value: any) =>{
        // 打开对话框，设置form的值
        setIsModalOpen(true)
        const tempProps = Object.assign({}, SendTokenProps, 
            {
                handleOk: () => { 
                    setIsModalOpen(false)
                },
                initvalue: value,
            })
        setModalProps(tempProps)
    }

    // table中的action按钮
    const handleActionMeter = (value: any) =>{
        // 打开对话框，设置form的值
        setIsModalOpen(true)
        const tempProps = Object.assign({}, ActionProps, {
            handleOk: ()=>{
                // action接口
                setIsModalOpen(false)
            },
            okText: 'Disconnect',
            cancelText: 'Connect',
        })
        setModalProps(tempProps)
    }




    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

    // Table中的操作框
    const [isReadModalOpen, setIsReadModalOpen] = useState(false);


    // 两个合并在一起
    // 批量删除meter
    
    // 删除单个meter
    const handleDeleteMeter = (recode: MeterType) =>{
        console.log('删除ID', recode);
    }

    const inputRef = createRef();
    const [modelTitle, setModelTitle] = useState('');

    

   

    // table中每行readdata操作
    const handleReadDataTypeChange = (value: string) =>{
        console.log('readdata', value)
    }

    useEffect(() => {

        setIsDisabled(selectedRowKeys.length ? false : true)

    },[selectedRowKeys])



    // 对话框操作部分
    const handleOk = () => {
        // 获取form表单中的数据 对象类型
        setIsModalOpen(false);
        // let formValue = form.getFieldsValue();
        // formValue.builddata = new Date();
        // let tempState = Object.assign([], dataSource)
        // tempState.push(formValue)
        // console.log(tempState)
        // setDataSource(tempState)
        // form.resetFields()
        
        
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    
    return (
        <>
            {/* 封装成searchList */}
            <div>
                <Input value={meterQuery} placeholder='meterno' onChange={(e)=>setmeterQuery(e.target.value)} style={{width: 150, margin: 10}}/>
                <Button type='default' onClick={handleQuery}>Query</Button>
                <Button type='primary'onClick={handleAddMeter}>Add</Button>
                <Button type='primary' danger disabled={isDisable} onClick={handleBatchDelete}>Batch delete</Button>
            </div>
            {/* Meter渲染列表 */}
            <Table
                rowSelection={rowSelection}
                columns={columns}  
                dataSource={dataSource}
                rowKey={(record)=>record.meterno} 
            >
            </Table>

            {/* 公用对话框 */}
            <WModal
                open={isModalOpen}
                handleCancel={()=>{setIsModalOpen(false)}}
                propValue={modalProps}
                >
            </WModal>



            {/* 添加和修改对话框 */}
            {/* <Modal title={modelTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            </Modal> */}

            
            {/* 读取数据对话框 */}

            {/* <Modal 
                title='ReadData'
                open={isReadModalOpen}
                >
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
                        rules={[{ required: true}]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Cim"
                        name="Cim"
                    >
                        <Cascader options={readMeterDataOptions} onChange={handleReadDataTypeChange} placeholder="Please select" />
                    </Form.Item>


                </Form>
            </Modal> */}
                
        </>
    )
}

export default meterInfo;
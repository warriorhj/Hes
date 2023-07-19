/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:42:53
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-19 13:30:48
 * @FilePath: \hes\src\app\home\meterInfo\page.tsx
 */
'use client'
import {useState, useEffect, useRef} from 'react'
import {Table, Tag, Space, Input, Button, Modal, Form, Cascader, Popconfirm} from "antd";
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

const readMeterDataOptions:Option[] = [
    {
        value: "Instantaneous voltage L1",
        label: "Instantaneous voltage L1"
    },{
        value: "Instantaneous current L1",
        label: "Instantaneous current L1"
    },{
        value: "Instantaneous current L2",
        label: "Instantaneous current L2"
    },
    {
        value: "Instantaneous active power import L1",
        label: "Instantaneous active power import L1"
    },
    {
        value: "Instantaneous active power export L2",
        label: "Instantaneous active power export L2"
    },
    {
        value: "Over Active Power threshold",
        label: "Over Active Power threshold"
    },
    {
        value: "Active accumulative energy import",
        label: "Active accumulative energy import"
    },
    {
        value: "Active accumulative energy export",
        label: "Active accumulative energy export"
    },
    {
        value: "prepay-current balance",
        label: "prepay-current balance"
    },
    {
        value: "remote_disconnet(data)",
        label: "remote_disconnet(data)"
    },{
        value: "remote_reconnet(data)",
        label: "remote_reconnet(data)"
    },{
        value: "Token gateway enter token",
        label: "Token gateway enter token"
    }
]
    




// const readMeterDataOptions: Option[] = [
//     {
//       value: 'InstantaneousValue',
//       label: 'InstantaneousValue',
//       children: [
//         {
//           value: 'A phase voltage',
//           label: 'A phase voltage',
//         },
//         {
//           value: 'A phase current',
//           label: 'A phase current',
//         },
//         {
//           value: 'A phase power factor',
//           label: 'A phase power factor',
//         }
//       ],
//     },
//     {
//       value: 'Energy',
//       label: 'Energy',
//       children: [
//         {
//           value: 'Active energy (|+A|-|-A|) Net total',
//           label: 'Active energy (|+A|-|-A|) Net total',
//         },
//         {
//            value: 'Active energy (|+A|-|-A|) Net tariff1',
//            label: 'Active energy (|+A|-|-A|) Net tariff1',
//         }
//       ],
//     },
//   ];

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

    const [dataSource, setDataSource] = useState()

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const [isDisable, setIsDisabled] = useState(true)

    // wModal中的ref
    const formRef = useRef()


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
                {/* <Button type='link' danger onClick={() => handleDeleteMeter(record)}>Delete</Button> */}
                <Button type='link' onClick={() => handleReadDataMeter(record)}>ReadData</Button>
                <Button type='link' onClick={() => handleSendTokenMeter(record)}>SendToken</Button>
                <Button type='link' onClick={() => handleActionMeter(record)}>Action</Button>
                <Popconfirm
                    title="Delete the Meter"
                    description={"Are you sure to delete this meter:" + record.meterno}
                    okText="Confirm"
                    cancelText="cancel"
                    onConfirm={() => handleDeleteMeter(record)}
                >
                    <Button type='link' danger>Delete</Button>
                </Popconfirm>
            </Space>
            ),
        }
    ]
    
    // 111 顶部table操作部分  添加meter按钮
    const handleAddMeter = () =>{
        setIsModalOpen(true)
        
        const tempProps = Object.assign({}, MeterProps, {handleOk: async ()=>{
            // 添加meter接口
            const insertData = formRef.current?.formFields();
            const result = await fetch('/api/meter/insertMeter',{
                method: "POST",
                body: JSON.stringify(insertData),
            })
            console.log(result)
            // 重置表单
            formRef.current?.formResets();
            setIsModalOpen(false)
            // 刷新页面数据
            handleQuery();
        },})
        setModalProps(tempProps)
    }

    // 顶部query按钮 
    const handleQuery = async () =>{
        // 静态数据
        // const result = {res:[{"_id":"64b4ecf76e13592e9afc25bc","meterno":"warrior3","metermodel":"112134234","manufacturer":"21","orgcode":"423","ctratio":"ew2","ptratio":"ew31","builddata":"2023-07-17T07:25:43.781Z","metertype":"3","metermode":"f2","__v":0,"protocol":"1213123123"},{"_id":"64b4fb676e13592e9afc25fa","meterno":"warrior123","metermodel":"312","manufacturer":"123","orgcode":"132","ctratio":"231","ptratio":"231","protocol":"3","builddata":"2023-07-17T08:27:19.297Z","metertype":"3","metermode":"2","__v":0}]}
        // setDataSource(result.res)
        
        const result = await fetch(`/api/meter/getBymeterno?meterno=${meterQuery}`).then(res=>{
            return res.json()
        }).then(res=>{
            // console.log('res', res)
            setDataSource(res.res)
            // console.log('res', typeof res,JSON.parse(res))
        });
        setmeterQuery('')
        // 查询接口
    }
    
    // 批量删除meter
    const handleBatchDelete = async () =>{
        console.log('批量删除ID', typeof selectedRowKeys, selectedRowKeys);
        const deletelist = JSON.stringify(selectedRowKeys);
        const result = await fetch(`/api/meter/deleteMeter/${deletelist}`,{
            method: "DELETE",
        }).then(res=>res.json()).then(res=>{
            console.log(res)
        })
        // 刷新页面数据
        handleQuery();
    }
    // 单个删除meter
    const handleDeleteMeter = async (recode: MeterType) =>{
        console.log('删除ID', recode);
        // let deletelist = [recode.meterno];
        const deletelist = JSON.stringify([recode.meterno]);
        const result = await fetch(`/api/meter/deleteMeter/${deletelist}`,{
            method: "DELETE",
        }).then(res=>res.json()).then(res=>{

        })
        console.log(result)
        // 刷新页面数据
        handleQuery(); 
    }

    // 222 table中columns的change操作
    const handleChangeMeter = (value: any) =>{
        console.log('修改ID', value);
        setIsModalOpen(true)
        const tempProps = Object.assign({}, MeterProps, {
            handleOk: async ()=>{
            // 修改meter接口
            // 获取form表单
            const changeData = formRef.current?.formFields();
            const updateData = Object.assign({},changeData,{id:value._id})
            console.log('changeData', typeof updateData, updateData);
            const result = await fetch('/api/meter/updateMeter',{
                method: "PUT",
                body: JSON.stringify(updateData),
            }).then(data=>data.json())
            .then(res=>{
                console.log(res)
            })
            setIsModalOpen(false)
            // 刷新页面数据
            handleQuery();
            },
            initvalue: value,
        })
        tempProps.title = 'Change Meter'
        setModalProps(tempProps)
        form.setFieldsValue(value)
        
    }

     // table中的读取数据按钮
     const handleReadDataMeter = (value: any) =>{
        // 打开对话框，设置form的值

        
        
        setIsModalOpen(true)
        const tempProps = Object.assign({}, ReadDataProps, {handleOk: async ()=>{
            // 读取数据接口
            setIsModalOpen(false)
            const formData = formRef.current?.formFields();
            const readItem = formData.Cim[0];
            // 获取选择读取的数据
            console.log(readItem)
            const result = await fetch(`/api/readdata?readItem=${readItem}`)
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                })

            
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

    // 配置table的选择项
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

   
    


    // 批量删除按钮禁用
    useEffect(() => {
        handleQuery();
        setIsDisabled(selectedRowKeys.length >= 2 ? false : true);

        

    },[selectedRowKeys])


    
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
                ref={formRef}
                open={isModalOpen}
                handleCancel={()=>{setIsModalOpen(false)}}
                propValue={modalProps}
                >
            </WModal>                
        </>
    )
}

export default meterInfo;
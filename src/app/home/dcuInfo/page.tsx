/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-14 13:43:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-14 13:55:59
 * @FilePath: \hes\src\app\home\dcuInfo\page.tsx
 */
'use client'
import {Table, Tag, Space} from "antd";
import type {ColumnsType} from 'antd/es/table';
import * as dayjs from 'dayjs';

interface DcuType {
    dcuno: string,
    protocol: number,
    builddata: Date,
    orgcode?: string
}

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
        render: (val) => <Tag>{val}</Tag>
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
        render: (val) => <Tag>{val ? val:"-"}</Tag>
    },
    {
        title: 'Operation',
        key: 'action',
        render: (_, record) => (
        <Space size="middle">
            <a>Change</a>
            <a>Delete</a>
        </Space>
        ),
    }
]

const dataSource: DcuType[] = [
    {
        dcuno: "1111015600",
        protocol: 3,
        builddata: new Date(),
    },
    {
        dcuno: "1111015600",
        protocol: 3,
        builddata: new Date(),
    },
    {
        dcuno: "1111015600",
        protocol: 3,
        builddata: new Date(),
    },
  ];

const meterInfo: React.FC = () =>{

    return (
        <>
            <Table
                columns={columns}  
                dataSource={dataSource}  
            >
            </Table>
        </>
    )
}

export default meterInfo;
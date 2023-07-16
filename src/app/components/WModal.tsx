/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-15 13:58:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-15 19:13:15
 * @FilePath: \Hes\src\app\components\WModal.tsx
 */
// 封装model对话框: 根据传入的props可以渲染不同的modal，如表单，文字提示
'use client'
import React, { use, useState, useEffect } from 'react';
import { Modal, Button, Form, Input, Cascader} from 'antd';

interface ModelProps {
    propValue:any;
    open: boolean;
    handleCancel: () => void;
    children?: React.ReactNode;
    okText?: string;
    cancelText?: string;
}

const WModal = (props: ModelProps) =>{

    const {open, propValue, handleCancel} = props;
    const {title, handleOk, content, initvalue, okText, cancelText} = propValue;
    const [ModalForm] = Form.useForm();

    useEffect(() => {
        console.log('initvalue', initvalue, props)
        if(typeof initvalue !== 'undefined' && initvalue !== null){
            ModalForm.setFieldsValue(initvalue);
        }
        else{
            // 重置表单，避免保存上次的数据
            ModalForm.resetFields();
        }
    }, [initvalue])

    const initModal = (modallist: any) => {
        if(modallist?.type === 'Text'){
            return <div>{modallist.textArea}</div>
        }
        else{
            return (
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{maxWidth: 600, textAlign: 'center'}}
                    autoComplete="off"
                    labelAlign='left'
                    form={ModalForm}
                >
                    {modallist?.form?.map(item =>{
                        if(item.type === 'input'){
                            return (
                                <Form.Item
                                key = {item.label}
                                label={item.label}
                                name={item.label}
                                rules={[{ required: item.require}]}
                                >
                                    <Input />
                                </Form.Item>
                            )
                        }
                        else if(item.type === 'cascade'){
                            return (
                                <Form.Item
                                    key = {item.label}
                                    label={item.label}
                                    name={item.label}
                                    >
                                        <Cascader options={item.list} placeholder="Please Select" />
                                </Form.Item>
                            )
                        }
                    }
                    )}
            </Form>
            )
            

        }
    
    }

    return (
            <Modal
            open={open}
            title={title}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={okText}
            cancelText={cancelText}
            >
                {initModal(content)}
            </Modal>
    )

}

export default WModal;
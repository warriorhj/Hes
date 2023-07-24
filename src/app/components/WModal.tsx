/*
 * @Descripttion: 
 * @version: 
 * @Author: Hao
 * @Date: 2023-07-15 13:58:11
 * @LastEditors: Hao
 * @LastEditTime: 2023-07-24 15:50:35
 * @FilePath: \hes\src\app\components\WModal.tsx
 */
// 封装model对话框: 根据传入的props可以渲染不同的modal，如表单，文字提示
'use client'
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Modal, Button, Form, Input, Cascader} from 'antd';

interface ModelProps {
    propValue:any;
    open: boolean;
    children?: React.ReactNode;
    okText?: string;
    cancelText?: string;
    
}

const WModal = (props: ModelProps, ref) =>{

    const {open, propValue} = props;
    const {title, handleOk, content, initvalue, okText, cancelText, handleCancel} = propValue;
    const [ModalForm] = Form.useForm();
    const formRef = useRef();

    useEffect(() => {
        // console.log('initvalue', initvalue, props)
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

    useImperativeHandle(ref, () => {
        return {
            formFields: ModalForm.getFieldsValue,
            formResets: ModalForm.resetFields
        }
    })

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

export default forwardRef(WModal);
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { host } from '../../App';
export default function CreateThanhPhanDanhMuc({ loadData, visible, icon, viewIcon }) {
    const [form] = Form.useForm();
    const [load, setLoad] = useState(false);
    useEffect(() => {
        form.setFieldsValue({ danhmuc_id: visible[0]})
    }, [form, visible])
    
    const finish = (data) =>{
        setLoad(true);
        axios.post(host('categories_component'), data)
        .then((result) => {
            if (result.data.type === 'success') {
                message.success('Thêm danh mục thành công');
                visible[1]();
                loadData();
                form.resetFields();
            } else {
                message.error('Thêm danh mục thất bại!');
            }
        }).catch((err) => {
            message.error('Lỗi hệ thống Server ' + err);
        }).finally(() => setLoad(false));
    }
    return (
        <Modal title='Thêm mới thành phần Danh Mục' visible={visible[0] !== undefined} onCancel={() => visible[1]()} footer={false}>
            <Form onFinish={finish}
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Form.Item hidden name='danhmuc_id'><Input/></Form.Item>
                <Form.Item label='Tên Thành Phần' required name='name'>
                    <Input placeholder='Nhập tên thành phần...' />
                </Form.Item>
                <Form.Item label='Biểu tượng' required name='icon'>
                    <Select showSearch placeholder='Lựa chọn icon...' autoClearSearchValue>
                        {icon.map(e => <Select.Option key={e}> {viewIcon[e].render()} {e}</Select.Option>)}
                    </Select>
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button htmlType='submit' icon={load ? <LoadingOutlined /> : <PlusOutlined />} type='primary' shape='round'>Thêm mới thành phần</Button>
                </div>
            </Form>
        </Modal>
    )
}

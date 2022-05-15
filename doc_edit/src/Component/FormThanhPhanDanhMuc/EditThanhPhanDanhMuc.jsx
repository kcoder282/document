import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Select, Button, message } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { host } from '../../App';

export default function EditThanhPhanDanhMuc({ loadData, visible, icon, viewIcon }) {
    const [form] = Form.useForm();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (visible[0] !== undefined)
            axios.get(host('categories_component/' + visible[0]))
                .then((result) => {
                    form.setFieldsValue(result.data);
                    console.log(result.data);
                })
    }, [form, visible])

    const finish = (data) =>{
        setLoad(true);
        axios.put(host('categories_component/' + visible[0]), data)
            .then((result) => {
                if (result.data.type === 'success') {
                    message.success('Cập nhật thành công');
                    visible[1]();
                    loadData();
                    form.resetFields();
                } else {
                    message.error('Cập nhật thất bại!');
                }
            }).catch((err) => {
                message.error('Lỗi hệ thống Server ' + err);
            }).finally(() => setLoad(false));
    }

    return (
        <Modal title='Chỉnh sửa thành phần danh mục' visible={visible[0] !== undefined} onCancel={() => visible[1]()} footer={false}>
            <Form
                onFinish={finish}
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}>
                <Form.Item label='Tên thành phần' required name='name'>
                    <Input placeholder='Nhập tên thành phần...' />
                </Form.Item>
                <Form.Item label='Biểu tượng' required name='icon'>
                    <Select showSearch placeholder='Lựa chọn icon...' autoClearSearchValue>
                        {icon.map(e => <Select.Option key={e}> {viewIcon[e].render()} {e}</Select.Option>)}
                    </Select>
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button htmlType='submit' icon={load ? <LoadingOutlined /> : <SaveOutlined />} type='primary' shape='round'>Lưu thay đổi</Button>
                </div>
            </Form>
        </Modal>
    )
}

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Modal, Form, Input, Select, Button, message } from 'antd'
import axios from 'axios';
import React, { useState } from 'react'
import { host } from '../../App';

export default function CreateDanhMuc({ loadData, visible, icon, viewIcon }) {
  const [form] = Form.useForm();
  const [load, setLoad] = useState(false);
  const finish = (data) => {
    setLoad(true);
    axios.post(host('categories'), data)
      .then((result) => {
        if (result.data.type === 'success') {
          message.success('Thêm danh mục thành công');
          visible[1](false);
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
    <Modal title='Thêm Danh Mục Mới' visible={visible[0]} onCancel={() => visible[1](false)} footer={false}>
      <Form
        onFinish={finish}
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}>
        <Form.Item label='Tên Danh Mục' required name='name'>
          <Input placeholder='Nhập tên danh mục...' />
        </Form.Item>
        <Form.Item label='Biểu tượng' required name='icon'>
          <Select showSearch placeholder='Lựa chọn icon...' autoClearSearchValue>
            {icon.map(e => <Select.Option key={e}> {viewIcon[e].render()} {e}</Select.Option>)}
          </Select>
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Button htmlType='submit' icon={load ? <LoadingOutlined /> : <PlusOutlined />} type='primary' shape='round'>Thêm Danh Mục</Button>
        </div>
      </Form>
    </Modal>
  )
}

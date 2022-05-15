import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import img from './LayoutDefault/imgs/logoAnhtester.png';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { host, setKey } from '../App';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function Login({ user, setUser }) {
    const [form] = Form.useForm();
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();
    const finish = (data) => {
        setLoad(true)
        axios.post(host('login'), data)
            .then((result) => {
                setUser(result.data)
                if (result.data.id) {
                    message.success('Đăng nhập thành công');
                    navigate(-1);
                    setKey(result.data.remember_token, 3600);
                } else {
                    message.error('Đăng nhập thất bại');
                }
            }).finally(() => setLoad(false))
    }
    useEffect(() => {
        document.title = 'Login - system '
    }, [])

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem 3rem', marginTop: '3rem', borderRadius: '1rem', boxShadow: '.5rem .5rem 1rem #555' }}>
                <h1 style={{ fontSize: '2.5rem', color: '#007bff' }}>Sign in System</h1>
                <img src={img} style={{ width: '200px', marginBottom: '2rem' }} alt="" />
                <Form
                    onFinish={finish}
                    form={form} labelAlign='left'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}>
                    <Form.Item name='username' required label='User name'><Input placeholder='Input username' /></Form.Item>
                    <Form.Item name='password' required label='Password'><Input.Password placeholder='Input password' /></Form.Item>

                    <div>
                        <Button loading={load} htmlType='submit' size='large' shape='round' type='primary' icon={<UserOutlined />}>Login</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

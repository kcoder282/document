import logo from "./imgs/logoAnhtester.png";
import "./LayoutDefault.css";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Layout, Menu, message, Modal } from "antd";
import { CloseCircleFilled, EditFilled, LogoutOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import * as icon from '@ant-design/icons';
import CreateDanhMuc from "../FormDanhMuc/CreateDanhMuc";
import { host } from "../../App";
import axios from "axios";
import EditDanhMuc from "../FormDanhMuc/EditDanhMuc";
import CreateThanhPhanDanhMuc from "../FormThanhPhanDanhMuc/CreateThanhPhanDanhMuc";
import EditThanhPhanDanhMuc from './../FormThanhPhanDanhMuc/EditThanhPhanDanhMuc';
import ContentEdit from './../Content/ContentEdit';
import { Link, useParams } from "react-router-dom";
import { setKey } from './../../App';

const { Header, Content, Footer, Sider } = Layout;
const dataIcon = [];
for (const key in icon) {
  try {
    icon[key].render();

    dataIcon.push(key)
  } catch (error) {

  }
}
export default function LayoutDefault({ user, setUser }) {
  const [showDanhMuc, setShowDanhMuc] = useState(false);
  const [danhMuc, setDanhMuc] = useState([]);
  const [idEdit, setIdEdit] = useState();
  const [idEditItem, setIdEditItem] = useState();
  const [idDanhMuc, setIdDanhMuc] = useState();
  const data = useParams();
  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = () => {
    axios.get(host('categories'))
      .then((result) => {
        setDanhMuc(result.data);
      }).catch((err) => {
        message.error('Lỗi hệ thống Server ' + err);
      });
  }
  const DeleteDanhMuc = (id) => {
    Modal.confirm({
      title: 'Bạn muốn xóa danh mục',
      content: 'Khi xóa danh mục thì toàn bộ dữ liệu cũng bị xóa và không thể khôi phục được.',
      onOk: () => axios.delete(host('categories/' + id))
        .then((result) => {
          if (result.data.type === 'success') {
            message.success('Xóa danh mục thành công');
            LoadData();
          } else {
            message.error('Xóa danh mục thất bại!');
          }
        }).catch((err) => {
          message.error('Lỗi hệ thống Server ' + err);
        }),
      onCancel: () => { }
    })

  }
  
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Header className="header" style={{padding: '.5rem 1rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', height: '2.5rem'}}>
            <img src={logo} alt="Logo Anhtester" style={{ height: "100%" }} />
            {user?.id ?
            <div style={{ color: '#fff', minWidth: '100px', textAlign: 'right' }}>
              <Dropdown overlay={<Menu><Menu.Item icon={<LogoutOutlined/>} onClick={()=>{ setKey(''); setUser({id: 0}) }}>Logout</Menu.Item></Menu>}>
                  <>
                    <UserOutlined /> {user.name} 
                  </>
              </Dropdown>  
            </div>: ''}
          </div>
          <Menu theme="dark" mode="horizontal" />
        </Header>
        <Layout>
          <Sider breakpoint="md"
            collapsedWidth="0">
            <Menu mode="inline" style={{ height: "100%", borderRight: 0, }} defaultOpenKeys={[data.idItem]} defaultSelectedKeys={[data.id]}>
              {danhMuc.map(e =>
                <Menu.SubMenu key={e.id} icon={icon[e.icon].render()} title={
                  user.admin === 1 ?
                    <Dropdown overlay={
                      <Menu theme="dark">
                        <Menu.Item onClick={() => setIdEdit(e.id)} icon={<EditFilled />}> Chỉnh sửa </Menu.Item>
                        <Menu.Item onClick={() => DeleteDanhMuc(e.id)} icon={<CloseCircleFilled />}> Xóa danh mục </Menu.Item>
                      </Menu>
                    }><span>{e.name}</span></Dropdown>
                    : e.name
                } >
                  {e.thanhphan.map(k=>
                    <Menu.Item key={k.id} icon={icon[k.icon].render()}> 
                      <Link to={'/' + (k.name + '').replace(/ /g,'-') + '/' + k.id + '/' + e.id}>
                      <Dropdown overlay={
                        <Menu theme="dark">
                          <Menu.Item onClick={() => setIdEditItem(k.id)} icon={<EditFilled />}> Chỉnh sửa </Menu.Item>
                          <Menu.Item onClick={() => DeleteDanhMuc(k.id)} icon={<CloseCircleFilled />}> Xóa thành phần </Menu.Item>
                        </Menu>}><span>{k.name}</span>
                      </Dropdown>
                      </Link>
                  </Menu.Item>)}
                  {user.admin === 1 ?
                  <Menu.Item onClick={() => setIdDanhMuc(e.id)}  icon={<PlusOutlined />}>Thêm thành phần</Menu.Item>:''}
                </Menu.SubMenu>
              )}
              {user.admin === 1 ?
                <Menu.Item icon={<PlusOutlined />} onClick={() => setShowDanhMuc(true)}>Thêm danh mục</Menu.Item> : ''
              }
            </Menu>
          </Sider>
          <Layout
            style={{
              padding: "24px 24px 0 24px",
            }}
          >
            <Content className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}>
              <ContentEdit user={user} param={data}/>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>Document ©2022 Created by <Link to='/login'>Anhtester</Link></Footer>
      </Layout>
      <CreateDanhMuc loadData={LoadData} visible={[showDanhMuc, setShowDanhMuc]} icon={dataIcon} viewIcon={icon} />
      <EditDanhMuc loadData={LoadData} visible={[idEdit, setIdEdit]} icon={dataIcon} viewIcon={icon} />
      <CreateThanhPhanDanhMuc loadData={LoadData} visible={[idDanhMuc, setIdDanhMuc]} icon={dataIcon} viewIcon={icon} />
      <EditThanhPhanDanhMuc loadData={LoadData} visible={[idEditItem, setIdEditItem]} icon={dataIcon} viewIcon={icon}/>
      {user?.id ? <Button type={user.admin===1?"primary": 'dashed'} onClick={()=>setUser({...user, admin: user.admin===1?0: 1})} icon={<UserOutlined/>} shape='circle' size="large" style={{position: 'fixed', bottom: '1rem', right: '1rem'}}/>: ''}
    </>
  );
}

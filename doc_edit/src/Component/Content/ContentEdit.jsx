import React, { useState, useRef } from 'react'
import './Content.css';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js';
import { Button, message, Spin, Space, Empty } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import axios from 'axios';
import { host } from '../../App';
import { useEffect } from 'react';

export default function ContentEdit({ user, param}) {
  const [value, setValue] = useState(' ');
  const [load, setLoad] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const data = useRef();

  const saveData = () =>{
    console.log({ id: param?.id, content: data.current.getEditorContents()});
    setLoad(true)
    var content = data.current.getEditorContents();
    axios.post(host('content'), { id: param?.id, content: content })
    .then((result) => {
      console.log(result.data);
      if(result.data.type === 'success') 
      {
        message.success('Lưu nội dung thành công');
        setValue(content);
      }
      else message.error('Lỗi khi lưu nội dung');
    }).catch((err) => {
      message.error('' + err);
    }).finally(()=>setLoad(false))
  }
  useEffect(() => {
    document.title = (param?.all??'Không tim thấy').replace(/-/g, ' ');
    if (param?.id !== undefined)
    {
      setDataLoading(true);
      axios.get(host('content/' + param?.id))
      .then(e=>{
        setValue(e.data);
      }).finally(e => setDataLoading(false))
    }
  }, [param])
  
  return (
    param.all ? dataLoading ? <div style={{display: 'flex', justifyContent: 'center'}}><Spin size='large' style={{ marginTop: '2rem' }} /></div>:
    <div >
      <div style={{ position: 'sticky', top: 0, display: user?.admin === 1 ? 'block' : 'none' }}>
        <Space size='small' style={{marginBottom: '.5rem'}}>
          <Button loading={load} onClick={saveData} type='primary' shape='round' icon={<SaveOutlined/>}>Lưu Thay Đổi</Button>
        </Space>
      </div>
      <div id='dataOutput'>
        <ReactQuill ref={data} modules={{
          syntax: {
            highlight: text => hljs.highlightAuto(text).value,
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean']
            ]
          }} readOnly={user?.admin !== 1} value={value}
          theme="bubble" style={user?.admin === 1 ? { border: '1px solid black', borderRadius: '.5rem' } : {}}
          placeholder={user?.admin === 1 ? 'Hãy nhập nội dung' : ''} />
      </div>
      </div> : <Empty description='Không tìm thấy nội dung' style={{marginTop: '1rem'}}/>
  )
}

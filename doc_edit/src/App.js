import "antd/dist/antd.css";
import {useEffect, useState} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutDefault from './Component/LayoutDefault/LayoutDefault';
import Login from './Component/Login';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios.get(host('remember'))
    .then((result) => {
      setUser(result.data);
    })
  }, [])
  
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/:all/:id/:idItem" element={ <LayoutDefault user={user} setUser={setUser}></LayoutDefault>}/>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
        <Route path="/" element={ <LayoutDefault user={user} setUser={setUser}></LayoutDefault>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const host = (e, data) => {
  const dataHost = 'http://192.168.1.20:8000/api/';
  return dataHost + e+'?key='+key();
};
function setCookie(cname, cvalue, extime) {
  const d = new Date();
  d.setTime(d.getTime() + extime * 10000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function setKey(value, time) {
  return setCookie("key", value, time);
}

function key() {
  let key = getCookie("key");
  setKey(key, 3600);
  return key;
}
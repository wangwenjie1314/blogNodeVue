import { localStorage, sessionStorage, cookies } from "@/commons/services/cache";
import CryptoJS from 'crypto-js';

const getUser = () => {
  const data = localStorage.get('blogH5User');
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data + '', 'boomer').toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes);
  }
  return null;
}

const setUser = (playload) => {
  sessionStorage.put('blogH5Uid', playload.c_id);
  localStorage.put('blogH5Uid', playload.c_id);
  localStorage.put('blogH5User', CryptoJS.AES.encrypt(JSON.stringify(playload), 'boomer').toString());
  cookies.set("blogH5Uid", playload.c_id);
}

const removeUser = () => {
  sessionStorage.remove('blogH5Uid');
  localStorage.remove('blogH5Uid');
  localStorage.remove('blogH5User');
  cookies.remove("blogH5Uid");
}

export {
  getUser,
  setUser,
  removeUser
}

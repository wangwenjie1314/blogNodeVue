import { localStorage, sessionStorage, cookies } from "@/commons/services/cache";
import CryptoJS from 'crypto-js';

const getUser = () => {
  const data = localStorage.get('cmsBlogUser');
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data + '', 'boomer').toString(CryptoJS.enc.Utf8);
    return JSON.parse(bytes);
  }
  return null;
}

const setUser = (playload) => {
  sessionStorage.put('cmsBlogUid', playload.c_id);
  localStorage.put('cmsBlogUid', playload.c_id);
  localStorage.put('cmsBlogUser', CryptoJS.AES.encrypt(JSON.stringify(playload), 'boomer').toString());
  cookies.set("cmsBlogUid", playload.c_id);
}

const removeUser = () => {
  sessionStorage.remove('cmsBlogUid');
  localStorage.remove('cmsBlogUid');
  localStorage.remove('cmsBlogUser');
  cookies.remove("cmsBlogUid");
}

export {
  getUser,
  setUser,
  removeUser
}

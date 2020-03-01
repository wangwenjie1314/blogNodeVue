import Vue from 'vue';
import axios from 'axios';
import store from '@/store';
import DICTS from '@/commons/configs/dicts';
/**
 * 是否为图片
 */
const isImg = function (fileName) {
  if (fileName.indexOf('.') > -1) {
    let suffix = '';
    if (fileName) {
      let result = fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length);
      suffix = result.toLowerCase();
    }
    return (DICTS.file.allows[suffix] || 'file') == "img";
  } else {
    return false;
  }
};
/**
 * 截取文件名
 * @param {*} text
 */
const splitFileName = function (text) {
  var pattern = /\.{1}[a-z]{1,}$/;
  if (pattern.exec(text) !== null) {
    return (text.slice(0, pattern.exec(text).index));
  } else {
    return text;
  }
};
/**
 * 图片文件上传
 * skipVerify 跳过文件校验 权重1
 * skipImgSize 跳过图片大小校验 权重2
 * uploadType //文件上传类型 0资源使用、1常规上传
 */
const uploadFile = function (opts) {
  let { file, url, c_id, msg, uploadType, uploadFileName, skipVerify, skipImgSize, skipSuccessMsg } = opts;
  let { $message } = Vue.prototype;
  return new Promise((resolve, reject) => {
    if (!skipVerify) {
      //先比较附件文件大小 update by boomer 2019-09-25 19:57:51
      if (file && file.name && isImg(file.name)) {
        if (!skipImgSize) {
          let { size, sizeStr } = DICTS.file.limit;
          if (file && file.size && file.size > size) {
            reject('当前上传文件大于' + sizeStr);
            return;
          }
        }
      } else {
        reject('请上传图片类型文件');
        return;
      }
    }
    let formData = new FormData();
    formData.append('multipartFile', file);
    if (url && c_id) {
      formData.append('c_id', c_id || '');
    } else {
      let { userInfo: loginUser } = store.getters;
      formData.append('par', loginUser && loginUser.c_id || '');
    }
    //资源名称
    let downloadname = uploadFileName || file.name;
    formData.append('downloadname', downloadname);
    //type类型 0资源模块、1常规文件上传
    formData.append('type', uploadType || "1");
    axios({
      url: window.blogConfig.api + (url || 'uploadApi/getDownloadPicPath'),
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-disposition': "attachment;filename='" + encodeURIComponent(downloadname) + "'; filename*=utf-8''" + encodeURIComponent(downloadname),
      }, // 请求头，发送FormData格式的数据，必须是 这种请求头。
      data: formData,// 上传formdata封装的数据
    }).then(function (result) {
      if (!skipSuccessMsg) {
        $message({
          type: 'success',
          message: msg || '上传成功',
        });
      }
      resolve(result);
    }, function () {
      reject('上传失败');
    });
  });
};

/**
 * 下载链接
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
const openNewWindowLink = (opts) => { //在新窗口中打开
  let openLink = document.querySelector("#openNewWindowLink");
  if (!openLink) {
    let domA = document.createElement("a");
    domA.setAttribute('href', '');
    domA.setAttribute('target', '_blank');
    domA.setAttribute('id', 'openNewWindowLink');
    let body = document.querySelector('body');
    if (body) {
      body.appendChild(domA);
    }
    openLink = domA;
  }
  if (!opts.notDownload) {
    openLink.setAttribute('href', opts.url);
    if (opts.downName) {
      openLink.setAttribute('download', opts.downName);
    }
  } else {
    openLink.removeAttribute('download');
    openLink.setAttribute('href', opts.url);
  }
  setTimeout(function () {
    openLink && openLink.click();
  }, 100);
};

export {
  isImg,
  splitFileName,
  uploadFile,
  openNewWindowLink
};

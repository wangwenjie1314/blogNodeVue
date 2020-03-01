/**
 * 缓存服务
 */
export const localStorage = {
  put: function (key, value) {
    if (window.localStorage) {
      window.localStorage.setItem(key, window.JSON.stringify(value));
    }
  },
  get: function (key) {
    if (window.localStorage) {
      var value = window.localStorage.getItem(key);
      return value ? window.JSON.parse(value) : null;
    } else {
      return null;
    }
  },
  remove: function (key) {
    if (window.localStorage) {
      window.localStorage.removeItem(key);
    }
  },
};
export const sessionStorage = {
  put: function (key, value) {
    if (window.sessionStorage) {
      window.sessionStorage.setItem(key, window.JSON.stringify(value));
    }
  },
  get: function (key) {
    if (window.sessionStorage) {
      var value = window.sessionStorage.getItem(key);
      return value ? window.JSON.parse(value) : null;
    } else {
      return null;
    }
  },
  remove: function (key) {
    if (window.sessionStorage) {
      window.sessionStorage.removeItem(key);
    }
  }
};
export const cookies = {
  set: function (name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  get: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  remove: function (name) {
    this.set(name, '1', -1);
  },
};

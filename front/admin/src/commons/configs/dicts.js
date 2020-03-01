/**
 * 系统变量
 */
//jpg,jpeg,bmp,png,gif,amr,mp3,xlsx,css,xls,mp4,flv,avi,doc,docx,zip,rar,pdf
const FileMime = {
  jpg: "image/jpg",
  jpeg: "image/jpeg",
  bmp: "image/bmp",
  png: "image/png",
  gif: "image/gif",
  amr: "audio/amr",
  mp3: "audio/mpeg",
  css: "text/css",
  mp4: "video/mp4",
  flv: "video/x-flv",
  avi: "video/x-msvideo",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  doc: "application/msword",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xls: "application/vnd.ms-excel",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ppt: "application/vnd.ms-powerpoint",
  pps: "application/vnd.ms-powerpoint",
  zip: "application/zip",
  rar: "application/x-rar-compressed",
  pdf: "application/pdf"
};

// 字典（字典下参数建议纯大写，只不过我不习惯大写识别用了小写）
const DICTS = {
  img: {
    default: "http://placeholder.qiniudn.com/640x300",
  },
  file: {
    limit: {
      size: 1048576000, //10MB
      sizeStr: "1000MB",
    },
    accept: {
      img: FileMime.jpg + ',' + FileMime.jpeg + ',' + FileMime.bmp + ',' + FileMime.png + ',' + FileMime.gif,
      file: FileMime.jpg + ',' + FileMime.jpeg + ',' + FileMime.bmp + ',' + FileMime.png + ',' + FileMime.gif + ',' + FileMime.amr + ',' + FileMime.mp3 + ',' + FileMime.xls + ',' + FileMime.xlsx + ',' + FileMime.css + ',' + FileMime.mp4 + ',' + FileMime.flv + ',' + FileMime.avi + ',' + FileMime.doc + ',' + FileMime.docx + ',' + FileMime.zip + ',' + FileMime.rar + ',' + FileMime.pdf + ',' + FileMime.ppt + ',' + FileMime.pptx,
      excel: FileMime.xls + ',' + FileMime.xlsx,
    },
    allows: {
      'jpg': 'img',
      'gif': 'img',
      'png': 'img',
      'bmp': 'img',
      'jpeg': 'img',
      'jpe': 'img',
      'tbi': 'img',
      'ico': 'img',
      'tif': 'img',
      'xpm': 'img',
      'xbm': 'img',
      'bmp': 'img',
      'mp3': 'audio',
      'amr': 'audio',
      'mp4': 'video',
      'flv': 'video',
      'wmv': 'video',
      'avi': 'video',
      'rmvb': 'video',
      'mkv': 'video',
      'zip': 'file',
      'txt': 'file',
      'doc': 'file',
      'pdf': 'file',
    },
  },
  page: {
    pageCurrent: 1,
    pageSize: 10,
    pageSizeBig: 5000,
    continuityNum: 5,
    pageTotal: 0,
    pageOptions: [10, 20, 30, 40, 50],
    prev: "上一页",
    next: "下一页",
    first: "首页",
    last: "尾页"
  },
  cookie: {
    day: 7,
  },
  day: {
    one: 86400000, //1天=24*60*60*1000=86400000毫秒
  },
  msg: {
    ok: "确定",
    close: "关闭",
    cancle: "取消",
    reload: "刷新页面",
    prompt: "系统提示",
    alert: "警告",
    success: {
      handle: "操作成功",
      submit: "提交成功",
      login: "登录成功",
      reg: "注册成功",
    },
    fail: {
      handle: "操作失败",
      submit: "提交失败",
    },
    error: {
      handle: "操作错误",
      submit: "提交错误",
      api: "服务器异常",
      system: "系统错误",
      network: "网络错误",
      ajax: "Ajax请求错误",
      params: "缺少必要参数",
      token: "缺少token",
    },
    null: {
      content: "暂无内容",
      data: "暂无内容",
      search: "暂无搜索条件相关数据",
    },
  },
  code: {
    "0001": "服务器异常",
    "0002": "系统未找到匹配的用户",
    "401": "缺少Token",
    "402": "Token错误",
    "403": "无权访问",
  },
};

//导出
export default DICTS;

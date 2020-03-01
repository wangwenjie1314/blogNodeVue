/**
 * 主入口启动文件
 * add by wwj
 * 2017-08-24 15:01:48
 */
var express = require('express'); //web 框架
var cors = require('cors'); //跨域
var logger = require('morgan'); //开发模式下log
var bodyParser = require('body-parser'); //json
var path = require('path'); //路径
var i18n = require('i18n'); //国际化
var config = require('config-lite'); //读取配置文件
var routes = require('./routes'); //路由
var winston = require('winston'); //日志
var expressWinston = require('express-winston'); //基于 winston 的用于 express 的日志中间件

//配置i18n
i18n.configure({
  locales: ['en', 'zh-CN'], //声明包含的语言
  cookie: 'locale',
  directory: __dirname + '/locales',
  defaultLocale: 'zh-CN' //默认的语言
});

//实例化express
var app = express();

//i18n
app.use(i18n.init);

//res.__ 生成
//req.__ 获取



// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

//格式化JSON的输出
app.set('json spaces', 2);

// log
app.use(logger('dev'));

//设置json
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public'))); //注意：中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；

//配置跨域
app.use(cors({
  origin: config.cors.origin, //'*',
  methods: "PUT,POST,GET,DELETE,OPTIONS",
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// 路由
routes(app);

//错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//开启定时任务
// var schedule = require('./services/schedule'); //定时
// schedule.checkOrder();

//app
module.exports = app;
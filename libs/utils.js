/**
 * 工具类
 * add by wwj
 * 2016-12-22 17:45:53
 */
// var config = require('config-lite'); //配置
var i18n = require('i18n'); //i18n
var underscore = require('underscore'); //js 工具函数

module.exports = {
	/**
	 * 工具类
	 * @type {[type]}
	 */
  underscore: underscore,
  /**
	 * 向前台返回JSON方法的简单封装
	 * @param  {[type]} opts [description]
	 * @return {[type]}      [description]
	 */
	handleJson: function(opts) { //json
		//-1失败、200成功
		if (opts.result) {
			opts.response.json({
				code: "200",
				msg: opts.msg || i18n.__('doSuccess'),
				result: opts.result,
			});
		} else {
			opts.response.json({
				code: "-1",
				msg: opts.msg || i18n.__('doFail'),
				result: '',
			});
		}
	},
	/**
	 * 处理错误error
	 */
	handleError: function(opts) {
		var that = this;
		var error = opts.error || "error";
		console.log(error);
		if (error == "break") {
			return;
		}
		//处理错误回执消息
		var failOptions = {
			response: opts.response,
			result: '',
		}
		if (typeof error === "string") {
			failOptions.msg = error;
		}
		//fail
		that.handleJson(failOptions);
	},
	/**
	 * String 去头尾空格
	 */
	trim: function(val) {
		if (val) {
			val = val + '';
			return val.replace(/(^\s+)|(\s+$)/g, '');
		} else {
			return "";
		}
	},
};
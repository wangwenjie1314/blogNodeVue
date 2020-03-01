/**
 * 工具类
 * add by wwj
 * 2016-12-22 17:45:53
 */
var Promise = require("bluebird");
var config = require('config-lite'); //配置
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
	/**
	 * 处理查询参数
	 * @param  {[type]} params [description]
	 * @return {[type]}      [description]
	 */
	handleCondition: function(params) {
		//组装查询条件
		var condition = {};
		for (var v in params) {
			if (v != 'currPage' && v != 'pageSize' && params[v]) {
				condition[v] = params[v];
			}
		}
		return condition;
	},
	/**
	 * 处理当期页码
	 * @param  {[type]} currPage [description]
	 * @return {[type]}          [description]
	 */
	handleCurrPage: function(currPage) {
		return +(currPage || config.page.currPage);
	},
	/**
	 * 处理总页码
	 * @param  {[type]} pageSize [description]
	 * @return {[type]}          [description]
	 */
	handlePageSize: function(pageSize) {
		return +(pageSize || config.page.pageSize);
	},
	/**
	 * 处理分页
	 * @param  {[type]} opts [description]
	 * @return {[type]}      [description]
	 */
	handlePage: function(opts) {
		return new Promise(function(resolve, reject) {
			var totalRow = opts.count || 0;
			var page = opts.page;
			var totalPage = Math.ceil(totalRow / page.pageSize);
			page.totalPage = totalPage;
			page.totalRow = totalRow;
			resolve(page);
		});
	},
	/**
	 * 验证必填项
	 * @param  {[type]} params [description]
	 * @return {[type]}        [description]
	 */
	validateMandatory: function(params) {
		var that = this;
		//检验必传项是否存在遗漏
		var checkFlag = true;
		for (var v in params) {
			if (!that.trim(params[v])) {
				checkFlag = false;
			}
		}
		return checkFlag;
	},
};
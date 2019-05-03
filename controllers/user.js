/**
 * user controllers
 * add by wwj
 * 2019-05-03 20:52:05
 */
var co = require('co');
var md5 = require('blueimp-md5'); //md5 加密
var i18n = require('i18n'); //i18n 国际化
var utils = require('../libs/utils'); //工具类
var User = require('../models/index').User; //用户
// var tokenService = require('../services/token'); //token服务

module.exports = {
	/**
	 * 检测邮箱是否注册checkEmail
	 */
	checkEmail:function(req, res, next) {
		//参数
		var params = req.query || req.params;
		//变量
		var email = utils.trim(params.email);
		if(!email){
			utils.handleJson({
				response: res,
				msg: i18n.__('success'),
				result: {
					emailHadReg:false,
				},
			});
		}
		co(function*() {
			var userResult = yield User.findOne({
				where: {
					email: email,
				},
			});
			var result =  false;
			if(userResult){
				result = true;
			}
			//success
			utils.handleJson({
				response: res,
				msg: i18n.__('success'),
				result: {
					emailHadReg:result,
				},
			});
		}).catch(function(error) {
			//err
			utils.handleError({
				response: res,
				error: error,
			});
		});
	},
	/**
	 * 注册 post
	 */
	reg: function(req, res, next) {
		var params = req.body;
		//变量
		var email = utils.trim(params.email);
		var password = utils.trim(params.password);
		//检查用户名、密码是否为空
		if (!email || !password) {
			utils.handleJson({
				response: res,
				msg: i18n.__('emailOrPwdNull'),
			});
			return;
		}
		//检查是否注册过
		co(function*() {
			var userResult = yield User.findOne({
				where: {
					email: email,
				},
			});
			//用户已被注册
			if (userResult) {
				utils.handleJson({
					response: res,
					msg: i18n.__('emailHadReg'),
				});
				return;
			}
			userResult = yield User.create({
				email: email,
				password: md5(password),
				state: "1", //先默认已激活状态 //状态 0未激活邮箱、1已激活邮箱
			});
			if (!userResult) { //注册失败
				utils.handleJson({
					response: res,
					msg: i18n.__('regFail'),
				});
				return;
			}
			//成功入库
			var user = userResult.dataValues;
			//删除密码
			delete user.password;
			//success
			utils.handleJson({
				response: res,
				msg: i18n.__('regSuccess'),
				result: {
					user: user,
					// accessToken: tokenService.setToken({
					// 	uuid: user.uuid
					// }), //token
				},
			});
		}).catch(function(error) {
			//err
			utils.handleError({
				response: res,
				error: error,
			});
		});
	},
	/**
	 * 登录
	 */
	login: function(req, res, next) {
		//参数
		var params = req.body;
		//变量
		var mobile = utils.trim(params.mobile);
		var password = utils.trim(params.password);
		//检查用户名、密码是否为空
		if (!mobile || !password) {
			utils.handleJson({
				response: res,
				msg: i18n.__('emailOrPwdNull'),
			});
			return;
		}
		//检查是否存在该用户
		co(function*() {
			var userResult = yield User.findOne({
				where: {
					mobile: mobile,
				},
			});
			if (!userResult) { //用户不存在
				utils.handleJson({
					response: res,
					msg: i18n.__('userNotExist'),
				});
				return;
			}
			var user = userResult.dataValues;
			//检查密码
			if (md5(password) != user.password) {
				//密码不正确
				utils.handleJson({
					response: res,
					msg: i18n.__('passwordError'),
				});
				return;
			}
			//增加用户标识
			if(user.password){
				delete user.password;//删除密码
				user.isPwd = true;
			}
			if(user.idcard){
				delete user.idcard;//删除身份证
				user.isVerify = true;
			}
			//success
			utils.handleJson({
				response: res,
				msg: i18n.__('loginSuccess'),
				result: {
					user: user,
					// accessToken: tokenService.setToken({
					// 	uuid: user.uuid
					// }), //token
				},
			});
		}).catch(function(error) {
			//err
			utils.handleError({
				response: res,
				error: error,
			});
		});
	},
};
/**
 * 邮箱服务
 * add by wwj
 * 2017-02-15 23:47:16
 */
var Promise = require("bluebird");
var i18n = require('i18n');
var config = require('config-lite'); //配置
var nodemailer = require('nodemailer'); //邮件服务

module.exports = {
	/**
	 * 发送邮件
	 */
	sendSystemEmail: function(opts) {
		return new Promise(function(resolve, reject) {
			//检验是否传入邮件接收者 和邮件标题 和邮件内容
			if (!opts.to || !opts.subject || !opts.html) {
				console.log(i18n.__('pleasePassParamsComplete'));
				reject(i18n.__('pleasePassParamsComplete'));
				return;
			}
			//从哪
			opts.from = opts.from || '"博客系统" <' + config.email.service + '>';
			//如果不是给管理员发 那么抄送管理员
			if(opts.to.indexOf(config.email.admin)<0){
				//抄送
				opts.cc = '"博客系统Admin" <'+ config.email.admin +'>';
			}
			var transporter = nodemailer.createTransport({
				pool: true,
				host: 'smtpdm.aliyun.com', //smtp.gmail.com
				port: 465, // 25
				secure: true, // use SSL
				auth: {
					user: config.email.service,
					pass: config.email.spassword,
				},
			});
			console.log(opts);
			transporter.sendMail(opts, function(error, info) {
				if (error) {
					console.log("邮件发送失败啦");
					console.log(error);
					reject('error');
					return;
				}
				if (info) {
					console.log('Message sent success: ' + JSON.stringify(info));
				}
				resolve('success');
			});
		});
	},
};
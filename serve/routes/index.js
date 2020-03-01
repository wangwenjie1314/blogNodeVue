/**
 * router
 */
var i18n = require('i18n'); //国际化
var utils = require('../libs/utils'); //工具类

module.exports = function(app) {
	//router分流
	app.use('/common', require('./common'));
	app.use('/user', require('./user'));
	app.use('/admin', require('./admin'));

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		if (res && !res.headersSent) {
			// var err = new Error('Not Found');
			// err.status = 404;
			// next(err);
			utils.handleJson({
				response: res,
				msg: i18n.__('requestApiError'),
			});
		}
	});
};
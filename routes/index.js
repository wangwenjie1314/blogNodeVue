/**
 * router
 */

module.exports = function(app) {
	//router分流
	// app.use('/common', require('./common'));
	// app.use('/user', require('./user'));
	// app.use('/house', require('./house'));
	// app.use('/admin', require('./admin'));
	// app.use('/bill', require('./bill'));
	// app.use('/order', require('./order'));

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		if (res && !res.headersSent) {
			var err = new Error('Not Found');
			err.status = 404;
			next(err);
			// utils.handleJson({
			// 	response: res,
			// 	msg: i18n.__('requestApiError'),
			// });
		}
	});
};